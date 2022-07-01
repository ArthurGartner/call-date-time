import os
import sys

#Searches modules folder
sys.path.insert(0, 'modules')
from dotenv import load_dotenv
import requests
from requests.exceptions import HTTPError

load_dotenv()

location = "en.usa"
api_key = os.getenv('GOOGLE_API_KEY')

url = f"https://www.googleapis.com/calendar/v3/calendars/{location}%23holiday%40group.v.calendar.google.com/events?key={api_key}"

def getHolidays():
#SAMPLE CODE FOR RESPONSE
    try:
        response = requests.get(url=url, params=None)
        #response.status_code (Need to check this!)
        data=response.json()
        dates = []

        for x in range(len(data['items'])):
            name = data['items'][x]['summary']
            date = data['items'][x]['start']['date']
            x = {
                "name": name,
                "date": date
            }
            dates.append(x)
        return {"dates": dates}
        
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except Exception as err:
        print(f'Other error occurred: {err}')

def lambda_handler(event, context):
    return getHolidays()