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

def test_vocabulary_list (driver):
    driver.maximize_window()
    driver.get(base_url)

    #cards = WebDriverWait(driver, 40).until(
    #EC.element_to_be_clickable((By.ID, "cards-btn")))
    #cards.click()
    #driver.implicitly_wait(40)
#
    #like = WebDriverWait(driver,20).until(
    #EC.element_to_be_clickable((By.ID,'like-icon')))
    #like.click()
    #close_cards = driver.find_element(By.CLASS_NAME, "langarts__memoryCards__header-close")
    #close_cards.click()

    vocabulary = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="vocabulary-btn"]')))
    driver.execute_script("arguments[0].click();", vocabulary)
    driver.implicitly_wait(10)


    vocabulary_list=driver.find_element(By.CLASS_NAME, "langarts__vocabulary__content-table")
    assert vocabulary_list.is_displayed()



    