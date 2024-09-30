import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export async function appendToSheet(values: any[][]) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });
    console.log(`${response.data.updates?.updatedCells} cells appended.`);
    return response;
  } catch (err) {
    console.error('The API returned an error: ' + err);
    throw err;
  }
}

export async function readFromSheet() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1',
    });
    const rows = response.data.values;
    if (rows?.length) {
      return rows;
    } else {
      console.log('No data found.');
      return [];
    }
  } catch (err) {
    console.error('The API returned an error: ' + err);
    throw err;
  }
}