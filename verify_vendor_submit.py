
from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_vendor_submit(page: Page):
    # Capture console logs to debug potential React errors
    page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))

    print("Navigating to vendorSubmit...")
    page.goto("http://localhost:3000/#vendorSubmit")

    # Wait for potential auth loading
    time.sleep(2)

    print("Taking debug screenshot...")
    page.screenshot(path="/home/jules/verification/vendor_submit_debug.png")

    # Check for the specific header from VendorSubmitPage
    print("Checking for 'Submit Your Solution' text...")
    try:
        expect(page.get_by_text("Submit Your Solution")).to_be_visible(timeout=5000)
        print("Success: 'Submit Your Solution' is visible.")
    except Exception as e:
        print(f"Failed to find text. Error: {e}")
        # If failed, maybe we are on home page?
        if page.get_by_text("The only platform that actually helped me").is_visible():
            print("Result: We are on the Home Page (Navigation failed).")
        elif page.get_by_text("Welcome Back").is_visible():
             print("Result: We are on the Login Page (Redirected).")
        else:
             print("Result: Unknown page state.")
        raise e

    # Verify form fields exist
    expect(page.locator('input[name="name"]')).to_be_visible()
    print("Success: Form input 'name' is visible.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_vendor_submit(page)
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
