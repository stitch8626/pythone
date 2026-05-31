import requests
from bs4 import BeautifulSoup
import csv 

HOST = "https://www.battlemetrics.com/" 
URL = "https://www.battlemetrics.com/servers/rust"

HEADERS = {
    "accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
}