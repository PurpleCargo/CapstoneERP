from __future__ import print_function
from googleapiclient.discovery import build
from google.oauth2 import service_account

import sys
# Obtén la información de la hoja de cálculo de Google

SERVICE_ACCOUNT_FILE = 'keys.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

credentials = None
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1KmVi1cCjZ7rq3Kuz3bdfsOhN96NbAOn4vsMxT35Xcdk'

service = build('sheets', 'v4', credentials=credentials)

# Call the Sheets API
sheet = service.spreadsheets()
result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range="Respuestas!A:J").execute()
data = result.get('values', [])

# input = sys.argv[1]
# output = data
# print(data)

sys.stdout.flush()

# Actualiza la base de datos
# update_pedidos(data)
