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


def test_navbar_memoryCards(driver):
    driver.maximize_window() 
    driver.get(base_url)
    
    driver.implicitly_wait(20)
    memoryCardsLink = driver.find_element(By.ID, 'memory-cards-navbar')

    assert memoryCardsLink.is_displayed(), "Element not found or not visible!"
    memoryCardsLink.click()
    memoryCardsBlock = driver.find_element(By.CLASS_NAME, "langarts__features")
    assert memoryCardsBlock.is_displayed()

def test_navbar_topics(driver):
    driver.maximize_window() 
    driver.get(base_url)

    driver.implicitly_wait(20)
    topicsLink = driver.find_element(By.ID, "topics-navbar")
    assert topicsLink.is_displayed(), "Element not found or not visible!"
    topicsLink.click()
    topicsBlock = driver.find_element(By.CLASS_NAME, "langarts__topics")
    assert topicsBlock.is_displayed()

def test_navbar_menu(driver):
    driver.get(base_url)
    driver.implicitly_wait(20)

    navbarMenu = driver.find_element(By.ID, "navbar-menu")
    assert navbarMenu.is_displayed(), "Element not found or not visible!"
    navbarMenu.click()

    navbarMenuContainer = driver.find_element(By.ID, "navbar-menu-container")
    assert navbarMenuContainer.is_displayed()

    memoryCardsLink = navbarMenuContainer.find_element(By.ID, "memory-cards-navbar")
    topicsLink = navbarMenuContainer.find_element(By.ID, "topics-navbar")
    assert memoryCardsLink.text == "Memory Cards", "Memory cards link text mismatched"
    assert topicsLink.text == "Topics", "Topics link text mismatched"

def test_close_navbar_menu(driver):
    driver.get(base_url)

    navbarMenu = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, "navbar-menu")))
    navbarMenu.click()

    navbarMenuContainer = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, "navbar-menu-container")))

    navbarMenu.click()

    WebDriverWait(driver, 10).until(
    EC.invisibility_of_element_located((By.ID, "navbar-menu-container")))


if __name__ == "__main__":
    pytest.main()