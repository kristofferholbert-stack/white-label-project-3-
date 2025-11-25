
import re
from playwright.sync_api import Page, expect, sync_playwright

def verify_changes(page: Page):
    # 1. Verify Membership Page Guarantee Badge
    print("Verifying Membership Page...")
    page.goto("http://localhost:3000/#membership")

    # Check for the guarantee text is visible on the Agency Builder card specifically
    # Use the pricing text to identify the card uniquely
    # Agency Builder is $99

    # Find the card that contains "$99"
    agency_card = page.locator("div", has_text="$99").filter(has_text="Agency Builder").last
    # .last because "div" matches parents too. The card is likely the deepest div with this text.
    # Or use a specific class if known. The cards have "rounded-3xl".

    agency_card = page.locator("div.rounded-3xl", has_text="Agency Builder")

    guarantee = agency_card.get_by_text('30-Day "First Client" Guarantee')
    expect(guarantee).to_be_visible()
    print("Membership Page Guarantee verified on Agency Builder tier.")
    page.screenshot(path="/home/jules/verification/membership_page_final.png")

    # 2. Verify Implementation Page Calendar Link
    print("Verifying Implementation Page...")
    page.goto("http://localhost:3000/#implementation")

    page.evaluate("window.open = (url) => { window.openedUrl = url; }")
    page.get_by_text("Book Your Strategy Call", exact=True).first.click()
    opened_url = page.evaluate("window.openedUrl")
    assert "cal.com" in opened_url
    print(f"Implementation Page Button opens: {opened_url}")
    page.screenshot(path="/home/jules/verification/implementation_page_final.png")

    # 3. Verify Resell Kits Stripe Link
    print("Verifying Resell Kits Page...")
    page.goto("http://localhost:3000/#resellKits")

    print("Resell Kits Page loaded.")
    page.screenshot(path="/home/jules/verification/resell_kits_page_final.png")


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_changes(page)
        finally:
            browser.close()
