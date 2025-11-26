import React, { useState, useEffect } from 'react';
import { getKitCourse, getProgressPercentage, Module, Lesson } from './kitModules';
import { useAuth } from './AuthProvider';
import { supabase } from './supabase';
import { CourseUpsellWidget, CommunityWidget, ProgressMilestoneWidget } from './CourseUpsellWidget';
import { CompletionCertificate, KeyboardShortcutsModal } from './CompletionCertificate';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

interface KitViewerPageProps {
  kitId?: string;
  onBack: () => void;
}

export const KitViewerPage: React.FC<KitViewerPageProps> = ({ kitId: propKitId, onBack }) => {
  const { user } = useAuth();

  // Extract kitId and lessonId from URL hash if not provided via props
  const getKitAndLessonFromUrl = () => {
    const hash = window.location.hash;
    const match = hash.match(/kitViewer\/([^\/]+)(?:\/([^\/]+))?/);
    if (match) {
      return { kitId: match[1], lessonId: match[2] };
    }
    return { kitId: propKitId || null, lessonId: null };
  };

  const [urlParams, setUrlParams] = useState(getKitAndLessonFromUrl());
  const kitId = urlParams.kitId || propKitId;
  const [course, setCourse] = useState(kitId ? getKitCourse(kitId) : null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showCertificate, setShowCertificate] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLocalStorage, setIsLocalStorage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [milestoneReached, setMilestoneReached] = useState<number | null>(null);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setUrlParams(getKitAndLessonFromUrl());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update course when kitId changes
  useEffect(() => {
    if (kitId) {
      const loadedCourse = getKitCourse(kitId);
      setCourse(loadedCourse);
    }
  }, [kitId]);

  // Set initial active lesson from URL or default to first lesson
  useEffect(() => {
    if (course && course.modules.length > 0) {
      if (urlParams.lessonId) {
        // Find the lesson from URL
        for (const module of course.modules) {
          const lesson = module.lessons.find(l => l.id === urlParams.lessonId);
          if (lesson) {
            setActiveModule(module);
            setActiveLesson(lesson);
            return;
          }
        }
      }
      // Default to first lesson
      setActiveModule(course.modules[0]);
      setActiveLesson(course.modules[0].lessons[0]);
    }
  }, [course, urlParams.lessonId]);

  // Load progress from localStorage for guest users or database for authenticated users
  useEffect(() => {
    setIsEnrolled(true);
    setEnrollmentLoading(false);
    loadProgress();
  }, [user, kitId]);

  // Helper: Get localStorage key for guest progress
  const getLocalStorageKey = (lessonId: string) => {
    return `guest_progress_${kitId}_${lessonId}`;
  };

  // Helper: Load guest progress from localStorage
  const loadGuestProgress = () => {
    if (!kitId || !course) return [];
    const completed: string[] = [];
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        const key = getLocalStorageKey(lesson.id);
        if (localStorage.getItem(key) === 'true') {
          completed.push(lesson.id);
        }
      });
    });
    return completed;
  };

  // Helper: Show toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadProgress = async () => {
    if (!kitId) {
      setLoading(false);
      return;
    }

    // If user is logged in, load from database
    if (user) {
      try {
        const { data, error } = await supabase
          .from('kit_progress')
          .select('lesson_id, completed')
          .eq('user_id', user.id)
          .eq('kit_id', kitId)
          .eq('completed', true);

        if (error) throw error;

        if (data) {
          setCompletedLessons(data.map(p => p.lesson_id));
          setIsLocalStorage(false);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Guest user - load from localStorage
      const guestProgress = loadGuestProgress();
      setCompletedLessons(guestProgress);
      setIsLocalStorage(true);
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    if (!kitId) return;

    // Optimistic update
    const isCompleted = completedLessons.includes(lessonId);
    const newCompletedState = isCompleted
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId];

    setCompletedLessons(newCompletedState);

    // Celebrate completion with confetti
    if (!isCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      // Check for milestone achievements
      const newProgress = course ? Math.round((newCompletedState.length / course.modules.reduce((sum, m) => sum + m.lessons.length, 0)) * 100) : 0;
      if (newProgress === 25 || newProgress === 50 || newProgress === 75) {
        setMilestoneReached(newProgress);
        setTimeout(() => setMilestoneReached(null), 5000);
      }
    }

    // If user is logged in, save to database
    if (user) {
      setSaveStatus('saving');

      try {
        const { error } = await supabase
          .from('kit_progress')
          .upsert({
            user_id: user.id,
            kit_id: kitId,
            module_id: activeModule?.id || '',
            lesson_id: lessonId,
            completed: !isCompleted,
            completed_at: !isCompleted ? new Date().toISOString() : null,
            last_accessed_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,kit_id,lesson_id'
          });

        if (error) throw error;

        setSaveStatus('saved');
        setIsLocalStorage(false);
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (error) {
        console.error('Error updating progress:', error);
        setSaveStatus('error');
        showToast('Failed to save progress. Please try again.');
        // Revert optimistic update
        setCompletedLessons(isCompleted ? [...completedLessons, lessonId] : completedLessons.filter(id => id !== lessonId));
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } else {
      // Guest user - save to localStorage
      const key = getLocalStorageKey(lessonId);
      if (isCompleted) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, 'true');
      }
      setIsLocalStorage(true);
      setSaveStatus('saved');
      showToast('Progress saved locally. Sign in to sync across devices.');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const updateLastAccessed = async (lessonId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('kit_progress')
        .upsert({
          user_id: user.id,
          kit_id: kitId,
          module_id: activeModule?.id || '',
          lesson_id: lessonId,
          last_accessed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,kit_id,lesson_id'
        });
    } catch (error) {
      console.error('Error updating last accessed:', error);
    }
  };

  const navigateToLesson = (module: Module, lesson: Lesson) => {
    // Add smooth transition effect
    setIsTransitioning(true);

    // Update state immediately for responsive UI
    setActiveModule(module);
    setActiveLesson(lesson);
    updateLastAccessed(lesson.id);

    // Update URL to reflect current lesson
    if (kitId) {
      window.location.hash = `#kitViewer/${kitId}/${lesson.id}`;
    }

    // Scroll to top of content
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Clear transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const getNextLesson = () => {
    if (!course || !activeModule || !activeLesson) return null;

    const currentModuleIndex = course.modules.findIndex(m => m.id === activeModule.id);
    const currentLessonIndex = activeModule.lessons.findIndex(l => l.id === activeLesson.id);

    if (currentLessonIndex < activeModule.lessons.length - 1) {
      return {
        module: activeModule,
        lesson: activeModule.lessons[currentLessonIndex + 1]
      };
    }

    if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      return {
        module: nextModule,
        lesson: nextModule.lessons[0]
      };
    }

    return null;
  };

  const getPreviousLesson = () => {
    if (!course || !activeModule || !activeLesson) return null;

    const currentModuleIndex = course.modules.findIndex(m => m.id === activeModule.id);
    const currentLessonIndex = activeModule.lessons.findIndex(l => l.id === activeLesson.id);

    if (currentLessonIndex > 0) {
      return {
        module: activeModule,
        lesson: activeModule.lessons[currentLessonIndex - 1]
      };
    }

    if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      return {
        module: prevModule,
        lesson: prevModule.lessons[prevModule.lessons.length - 1]
      };
    }

    return null;
  };

  const progress = course ? getProgressPercentage(kitId || '', completedLessons) : 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Ignore during transitions
      if (isTransitioning) {
        return;
      }

      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          const prev = getPreviousLesson();
          if (prev) navigateToLesson(prev.module, prev.lesson);
          break;
        case 'ArrowRight':
          e.preventDefault();
          const next = getNextLesson();
          if (next) navigateToLesson(next.module, next.lesson);
          break;
        case ' ':
          e.preventDefault();
          if (activeLesson) markLessonComplete(activeLesson.id);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeLesson, activeModule, course, isTransitioning]);

  // Check if course is complete and show certificate
  useEffect(() => {
    if (course && progress === 100 && !showCertificate) {
      // Delay slightly to let the UI update
      setTimeout(() => setShowCertificate(true), 500);
    }
  }, [progress, course]);

  // Loading state
  if (enrollmentLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading course...</p>
        </div>
      </div>
    );
  }

  // Access gate disabled - everyone can view courses

  // Course not found
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v4m0 4h.01"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
          <p className="text-slate-400 mb-6">The course content is being prepared. Check back soon!</p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-50 w-80 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 h-full`}
        role="navigation"
        aria-label="Course navigation"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex-shrink-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Safely navigate back without causing redirect issues
              if (typeof onBack === 'function') {
                onBack();
              }
            }}
            className="text-sm text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            <ChevronLeftIcon /> Back to Library
          </button>
          <h2 className="font-bold text-lg text-white mb-1">{course.title.split(' - ')[0]}</h2>
          <p className="text-xs text-slate-500 mb-4">{course.totalDuration}</p>

          {/* Progress Bar with Glow Effect */}
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-400">
              {completedLessons.length} of {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons
            </p>
            <p className="text-xs font-bold text-emerald-400">{progress}%</p>
          </div>
        </div>

        {/* Module List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id}>
              <div className="mb-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">
                  {module.title}
                </h3>
                <p className="text-[10px] text-slate-600 ml-2 mt-1">{module.estimatedTime}</p>
              </div>
              <div className="space-y-1">
                {module.lessons.map((lesson) => {
                  const isActive = activeLesson?.id === lesson.id;
                  const isCompleted = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm flex items-center gap-3 transition-all group ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {/* Interactive Checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markLessonComplete(lesson.id);
                        }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500'
                            : isActive
                            ? 'border-white/50 hover:border-white'
                            : 'border-slate-600 hover:border-slate-400'
                        }`}
                        title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                        aria-label={`${isCompleted ? 'Mark as incomplete' : 'Mark as complete'}: ${lesson.title}`}
                      >
                        {isCompleted && (
                          <CheckIcon />
                        )}
                      </button>

                      {/* Lesson Title - Clickable */}
                      <button
                        onClick={() => navigateToLesson(module, lesson)}
                        className={`flex-1 min-w-0 text-left ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                        } transition-colors`}
                      >
                        <p className={`text-xs font-medium truncate ${isCompleted ? 'line-through opacity-75' : ''}`}>
                          {lesson.title}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${
                          isActive ? 'text-white/60' : 'text-slate-500'
                        }`}>{lesson.duration}</p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronRightIcon />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">{activeLesson?.title}</h1>
              <p className="text-xs text-slate-500">{activeModule?.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Status Indicator - Enhanced with Cloud/Local Icons */}
            {saveStatus !== 'idle' && (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                saveStatus === 'saving' ? 'bg-blue-900/20 text-blue-400' :
                saveStatus === 'saved' ? (isLocalStorage ? 'bg-yellow-900/20 text-yellow-400' : 'bg-emerald-900/20 text-emerald-400') :
                'bg-red-900/20 text-red-400'
              }`}>
                {saveStatus === 'saving' && (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    {isLocalStorage ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                      </svg>
                    )}
                    <span className="hidden sm:inline">{isLocalStorage ? 'Saved locally' : 'Saved online'}</span>
                  </>
                )}
                {saveStatus === 'error' && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span className="hidden sm:inline">Save failed</span>
                  </>
                )}
              </div>
            )}

            <button
              onClick={() => setShowKeyboardShortcuts(true)}
              className="hidden md:flex px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors items-center gap-2"
              title="Keyboard Shortcuts (? key)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"></path>
              </svg>
            </button>
            {activeLesson?.downloadUrl && (
              <button className="hidden md:flex px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors items-center gap-2">
                <DownloadIcon />
                <span className="hidden lg:inline">Download</span>
              </button>
            )}
            <button
              onClick={() => activeLesson && markLessonComplete(activeLesson.id)}
              className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeLesson && completedLessons.includes(activeLesson.id)
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-slate-800 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <span className="md:hidden">{activeLesson && completedLessons.includes(activeLesson.id) ? '✓' : 'Mark'}</span>
              <span className="hidden md:inline">{activeLesson && completedLessons.includes(activeLesson.id) ? 'Completed ✓' : 'Mark Complete'}</span>
            </button>
          </div>
        </header>

        {/* Content Area with Fade-in Animation */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex gap-8">
            {/* Main Content */}
            <div className={`flex-1 max-w-4xl transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
              {activeLesson && (
                <LessonContent lesson={activeLesson} />
              )}
            </div>

            {/* Sidebar with Upsells */}
            <aside className="w-80 flex-shrink-0 space-y-6 hidden xl:block">
              <ProgressMilestoneWidget progress={progress} />
              <CourseUpsellWidget moduleId={activeModule?.id} lessonId={activeLesson?.id} />
              <CommunityWidget />
            </aside>
          </div>
        </div>

        {/* Bottom Navigation - Enhanced */}
        <footer className="bg-slate-900/95 border-t border-slate-800 px-4 md:px-8 py-4 flex items-center justify-between flex-shrink-0 backdrop-blur-sm">
          <button
            onClick={() => {
              if (!isTransitioning) {
                const prev = getPreviousLesson();
                if (prev) navigateToLesson(prev.module, prev.lesson);
              }
            }}
            disabled={!getPreviousLesson() || isTransitioning}
            className="px-4 md:px-6 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none"
            aria-label="Go to previous lesson"
          >
            <ChevronLeftIcon />
            <span className="hidden sm:inline">Previous Lesson</span>
            <span className="sm:hidden">Previous</span>
          </button>

          {/* Progress indicator in center */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i < Math.floor(progress / 20) ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{progress}% Complete</span>
          </div>

          <button
            onClick={() => {
              if (!isTransitioning) {
                const next = getNextLesson();
                if (next) navigateToLesson(next.module, next.lesson);
              }
            }}
            disabled={!getNextLesson() || isTransitioning}
            className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none"
            aria-label="Go to next lesson"
          >
            <span className="hidden sm:inline">Next Lesson</span>
            <span className="sm:hidden">Next</span>
            <ChevronRightIcon />
          </button>
        </footer>
      </main>

      {/* Certificate Modal */}
      {showCertificate && course && user && (
        <CompletionCertificate
          courseName={course.title}
          userName={user.email?.split('@')[0] || 'Student'}
          completionDate={new Date()}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <KeyboardShortcutsModal onClose={() => setShowKeyboardShortcuts(false)} />
      )}

      {/* Guest User Banner */}
      {!user && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span className="text-sm font-semibold">Sign in to save progress across devices</span>
            <button
              onClick={() => window.location.hash = '#login'}
              className="ml-2 px-4 py-1.5 bg-white text-blue-600 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-down">
          <div className="bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <p className="text-sm">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#10b981', '#14b8a6', '#f59e0b', '#ef4444', '#3b82f6'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Milestone Celebration Modal */}
      {milestoneReached && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-emerald-900 to-teal-900 border-2 border-emerald-500 rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-bounce-in">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {milestoneReached}% Complete!
              </h2>
              <p className="text-emerald-200 text-lg mb-6">
                {milestoneReached === 25 && "Great start! You're building momentum!"}
                {milestoneReached === 50 && "Halfway there! You're crushing it!"}
                {milestoneReached === 75 && "Almost done! Keep pushing!"}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setMilestoneReached(null)}
                  className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Keep Learning! →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LessonContent: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  if (lesson.type === 'text' && lesson.content) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl" role="article" aria-label="Lesson content">
        <div className="prose prose-invert max-w-none">
          {lesson.content.sections?.map((section: any, index: number) => (
            <div key={index} className="mb-10 scroll-mt-20" id={`section-${index}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 flex items-center gap-3 border-b border-slate-700 pb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                {section.heading}
              </h2>
              <div className="text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-line space-y-4">
                {section.body}
              </div>
            </div>
          ))}

          {lesson.content.note && (
            <div className="mt-8 p-5 bg-emerald-900/20 border-l-4 border-emerald-500 rounded-r-lg" role="note" aria-label="Important note">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400 flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <p className="text-sm md:text-base text-emerald-300 font-medium">{lesson.content.note}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (lesson.type === 'checklist' && lesson.content) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Action Items</h2>
        <div className="space-y-6">
          {lesson.content.tasks?.map((task: any, index: number) => (
            <div key={index} className="border-l-4 border-emerald-500 pl-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">{task.day}</h3>
              <ul className="space-y-2">
                {task.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border-2 border-slate-600 mt-0.5 flex-shrink-0"></div>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (lesson.type === 'tool' && lesson.content) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Tool</h2>
        {lesson.content.instructions && (
          <p className="text-slate-400 mb-6">{lesson.content.instructions}</p>
        )}

        {lesson.content.criteria && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Factor</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Dentist</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Legal</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">HVAC</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Restaurant</th>
                </tr>
              </thead>
              <tbody>
                {lesson.content.criteria.map((row: any, index: number) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-3 px-4 text-white font-medium">{row.factor}</td>
                    <td className="py-3 px-4 text-slate-300">{row.dentist}</td>
                    <td className="py-3 px-4 text-slate-300">{row.legal}</td>
                    <td className="py-3 px-4 text-slate-300">{row.hvac}</td>
                    <td className="py-3 px-4 text-slate-300">{row.restaurant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {lesson.content.recommendation && (
          <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
            <p className="text-sm text-emerald-300 font-medium">💡 {lesson.content.recommendation}</p>
          </div>
        )}
      </div>
    );
  }

  if (lesson.type === 'video') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-6">
          <p className="text-slate-500">Video content coming soon</p>
        </div>
        {lesson.description && (
          <p className="text-slate-400">{lesson.description}</p>
        )}
      </div>
    );
  }

  if (lesson.type === 'downloadable') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
        <DownloadIcon />
        <h3 className="text-xl font-bold text-white mb-2">Downloadable Resource</h3>
        <p className="text-slate-400 mb-6">{lesson.description}</p>
        <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 transition-colors flex items-center gap-2 mx-auto">
          <DownloadIcon />
          Download File
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <p className="text-slate-400">Content type not yet implemented: {lesson.type}</p>
    </div>
  );
};
