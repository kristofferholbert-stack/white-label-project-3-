
from playwright.sync_api import sync_playwright, expect
import os
import time

def run(playwright):
    # Create directory
    os.makedirs("/home/jules/verification", exist_ok=True)

    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    print("Navigating to homepage...")
    try:
        page.goto("http://localhost:3000")
    except Exception as e:
        print(f"Error navigating: {e}")
        return

    print("Waiting for content...")
    try:
        page.wait_for_selector("text=Scale your agency", timeout=10000)
    except Exception:
        print("Timeout waiting for homepage content. Taking screenshot...")
        page.screenshot(path="/home/jules/verification/error_homepage.png")
        raise

    print("Clicking $10k MRR goal...")
    # Use a more robust selector
    try:
        # Find the card with specific text, then find the button within it
        # Or just click the button directly if text is unique enough
        # The text is "$10k–$20k MRR"
        # The button text is "View Full Stack"
        # Let's try to target the button specifically for the first card.
        # The first card is $10k-20k.
        buttons = page.locator("button:has-text('View Full Stack')")
        buttons.first.click()
    except Exception as e:
         print(f"Error clicking button: {e}")
         page.screenshot(path="/home/jules/verification/error_click.png")
         raise

    print("Interacting with Modal...")
    try:
        page.wait_for_selector("text=Let's build your", timeout=5000)

        # Type 0 in the input
        page.fill("input[placeholder='0']", "0")

        # Click Calculate
        page.click("text=Calculate My Gap")

        # Click View My Roadmap
        page.click("button:has-text('View My Roadmap')")
    except Exception as e:
         print(f"Error in modal interaction: {e}")
         page.screenshot(path="/home/jules/verification/error_modal.png")
         raise

    print("Waiting for Blueprint Loader and Navigation...")
    # Wait for 2.5s loader + nav
    try:
        # Wait for the new H1
        page.wait_for_selector("h1:has-text('The Invisible SEO & Reputation Stack')", timeout=15000)
    except Exception:
         print("Timeout waiting for stack page. Taking screenshot...")
         page.screenshot(path="/home/jules/verification/error_nav.png")
         raise

    print("Verifying new sections...")
    try:
        expect(page.locator("text=The Logic (Why This Works)")).to_be_visible()
        expect(page.locator("text=The 10x ROI Breakdown")).to_be_visible()
        expect(page.locator("text=Sell this to just 3 clients to make")).to_be_visible()
    except Exception as e:
         print(f"Verification failed: {e}")
         page.screenshot(path="/home/jules/verification/error_verify.png")
         raise

    print("Taking screenshot...")
    page.screenshot(path="/home/jules/verification/stack_verification.png", full_page=True)

    print("Done.")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
