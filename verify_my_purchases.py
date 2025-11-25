
from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_my_purchases(page: Page):
    page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))

    print("Navigating to myPurchases...")
    page.goto("http://localhost:3000/#myPurchases")

    time.sleep(2)
    page.screenshot(path="/home/jules/verification/my_purchases_check.png")

    # Since 'myPurchases' is in protectedPages in App.tsx, and we are not logged in,
    # we expect to be redirected to the Login Page.
    # The Login Page has "Sign In" or "Welcome Back".

    print("Checking for redirect to Login Page...")
    try:
        # Check for standard Login page elements
        expect(page.get_by_text("Sign In", exact=True)).to_be_visible(timeout=5000)
        print("Success: Redirected to Login Page (Route is protected).")
    except:
        # Try "Welcome Back" which is also on login page
        if page.get_by_text("Welcome Back").is_visible():
            print("Success: Redirected to Login Page (Welcome Back visible).")
        else:
            print("Failure: Did not find Login Page elements.")
            if page.get_by_text("My Purchases").is_visible():
                print("Note: 'My Purchases' page is visible (Not protected?).")
            else:
                print("Unknown page state.")
            raise Exception("Route protection verification failed.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_my_purchases(page)
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
