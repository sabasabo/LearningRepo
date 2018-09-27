import datetime;
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging


class Constants:
    DATE = (datetime.date.today() + datetime.timedelta(days=1)).strftime("%Y%m%d")
    HOUR = '1610'
    SOURCE_STATION_ID = '2300'
    DESTINATION_STATION_ID = '9000'


def open_rakevet_luz():
    driver = webdriver.Chrome()
    driver.get('https://www.rail.co.il/pages/trainsearchresultnew.aspx?FSID=' +
               Constants.SOURCE_STATION_ID + '&TSID=' + Constants.DESTINATION_STATION_ID +
               '&Date=' + Constants.DATE + '&Hour=' + Constants.HOUR + '&IOT=true&IBA=false')
    assert "רכבת" in driver.title
    try:
        elements = WebDriverWait(driver, 17).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'trainBasicInfo')))
        hours = []
        assert len(elements) > 0
        for el in elements:
            date_in_element_container = el.find_elements_by_class_name('date')
            if len(date_in_element_container) != 0:
                formatted_date = Constants.DATE[6:8] + '.' + Constants.DATE[4:6] + '.' + Constants.DATE[:4]
                if formatted_date in date_in_element_container[0].text:
                    hours.append(el.find_element_by_class_name('hours-holder').text.replace('\n', ' -> '))

        print("Train from Haifa to Tel Aviv, tomorrow at " + Constants.HOUR + ":")
        print(hours);
    finally:
        driver.close()


if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
    open_rakevet_luz()
