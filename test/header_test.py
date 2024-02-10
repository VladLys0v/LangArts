import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

base_url = "http://localhost:3001/"

def test_header_content (driver):
    driver.maximize_window()
    driver.get(base_url)

    wait = WebDriverWait(driver, 10)
    moreBtn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "cta-button")))
    assert moreBtn.is_enabled() and moreBtn.is_displayed(), "Button is not clickable"

    header = driver.find_element(By.CLASS_NAME, "langarts__header")
    assert header.is_displayed() 
    assert "Learn New Languages with Ease" in header.text, "Expected text and visibility mismatch!"
    assert "We all know how difficult it can be to start learning a new language" in header.text, "Expected text and visibility mismatch!"