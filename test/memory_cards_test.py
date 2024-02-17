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

def test_cards_tab_visibility (driver):
    driver.maximize_window()
    driver.get(base_url)

    cards = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="cards_btn"]'))
    )
    driver.execute_script("arguments[0].click();", cards)

    no_countdown = WebDriverWait(driver,30).until_not(
    EC.visibility_of_element_located((By.CLASS_NAME, "langarts__memoryCards__countdown")))
    
    cards_tab = WebDriverWait(driver,30).until( no_countdown and
    EC.visibility_of_element_located((By.CLASS_NAME, "langarts__memoryCards-overlay")))
    
    assert cards_tab.is_displayed()
    