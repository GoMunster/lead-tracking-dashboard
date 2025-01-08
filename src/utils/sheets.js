// src/utils/googleSheetsConfig.js
import { google } from 'googleapis';
import credentials from '../credentials.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SPREADSHEET_ID = 'your-spreadsheet-id'; // Replace with your Sheet ID

export async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  return auth.getClient();
}

export async function getSheetData() {
  const authClient = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A2:Z', // Adjust range based on your data
    });

    return response.data.values;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return null;
  }
}

export function processLeadData(rawData) {
  return rawData.map(row => ({
    date: row[0],
    firstName: row[1],
    lastName: row[2],
    phoneNumber: row[3],
    email: row[4],
    qualified: row[5],
    practiceType: row[6],
    city: row[7],
    state: row[8],
    response: row[9]
  }));
}
