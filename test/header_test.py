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


def test_header_memoryCards(driver):
    driver.maximize_window() 
    driver.get(base_url)
    
    driver.implicitly_wait(20)
    memoryCardsLink = driver.find_element(By.ID, 'memory-cards-navbar')

    assert memoryCardsLink.is_displayed(), "Element not found or not visible!"
    memoryCardsLink.click()
    memoryCardsBlock = driver.find_element(By.CLASS_NAME, "langarts__features")
    assert memoryCardsBlock.is_displayed()

def test_header_topics(driver):
    driver.maximize_window() 
    driver.get(base_url)

    driver.implicitly_wait(20)
    topicsLink = driver.find_element(By.ID, "topics-navbar")
    assert topicsLink.is_displayed(), "Element not found or not visible!"
    topicsLink.click()
    topicsBlock = driver.find_element(By.CLASS_NAME, "langarts__topics")
    assert topicsBlock.is_displayed()

if __name__ == "__main__":
    pytest.main()