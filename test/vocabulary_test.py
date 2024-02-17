import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from memory_cards_test import test_cards_tab_visibility

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

base_url = "http://localhost:3001/"

def test_vocabulary_list (driver):
    driver.maximize_window()
    driver.get(base_url)

    vocabulary = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="vocabulary-btn"]')))
    driver.execute_script("arguments[0].click();", vocabulary)
    driver.implicitly_wait(10)

    vocabulary_list=driver.find_element(By.CLASS_NAME, "langarts__vocabulary__content-table")
    assert vocabulary_list.is_displayed()

def test_add_word (driver):
    test_vocabulary_list(driver)

    add_word_btn = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.CLASS_NAME, 'langarts__vocabulary__header-add')))
    add_word_btn.click()
    word_input = driver.find_element(By.ID, "add-word-input")
    assert word_input.is_displayed()
    word_input.send_keys("слово")
    submit=driver.find_element(By.ID, "submit-new-word")
    submit.click()
    driver.implicitly_wait(20)

    driver.refresh()
    driver.implicitly_wait(20)

    last_li_element = driver.find_element(By.XPATH, "/html/body/div/div/div[3]/div[4]/div/div[3]/div[2]/ul/li[last()]/div[1]/input")
    extracted_text = last_li_element.get_attribute("value")

    word = "слово"
    assert word in extracted_text


def test_favourites_tab (driver):
    driver.maximize_window()
    driver.get(base_url)

    cards = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="cards_btn"]'))
    )
    driver.execute_script("arguments[0].click();", cards)

    no_countdown = WebDriverWait(driver,30).until_not(
    EC.visibility_of_element_located((By.CLASS_NAME, "langarts__memoryCards__countdown")))
    
    like = WebDriverWait(driver,30).until( no_countdown and
    EC.element_to_be_clickable((By.ID,'like-icon')))
    like.click()

    close_cards = driver.find_element(By.CLASS_NAME, "langarts__memoryCards__header-close")
    close_cards.click()

    
    try:
        cards_page = WebDriverWait(driver, 10).until_not(
        EC.visibility_of_element_located((By.CLASS_NAME, "langarts__memoryCards-overlay"))
        )
        assert True, "page is closed"
    except:
        assert False,"page is displayed"
