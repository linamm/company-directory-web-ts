import * as Utilities from './utilities';

export { searchAll, searchCompanies, searchOfficers };
export { getCompany, getCompanyOfficers, getResource };
export { getPdfMetaResource };
//import { RNFetchBlob } from 'react-native-fetch-blob';


// ------------------------------------------------------
// Exported Functions
// ------------------------------------------------------
// API: https://developer.companieshouse.gov.uk/api/docs/search/search.html
// Response: https://developer.companieshouse.gov.uk/api/docs/search-overview/Search-resource.html
async function searchAll(queryString: string) {
  let uri = pathToUri(["search"]);
  return await get(uri, queryString);
}

// ------------------------------------------------------
// API: https://developer.companieshouse.gov.uk/api/docs/search/companies/companysearch.html
// Response : https://developer.companieshouse.gov.uk/api/docs/search-overview/CompanySearch-resource.html
async function searchCompanies(queryString: string) {
  let uri = pathToUri(["search", "companies"]);
  return await get(uri, queryString);
}

// ------------------------------------------------------
// API: https://developer.companieshouse.gov.uk/api/docs/search/officers/officersearch.html
// Response: https://developer.companieshouse.gov.uk/api/docs/search-overview/OfficerSearch-resource.html
async function searchOfficers(queryString: string) {
  let uri = pathToUri(["search", "officers"]);
  return await get(uri, queryString);
}

// ------------------------------------------------------
// API: https://developer.companieshouse.gov.uk/api/docs/company/company_number/readCompanyProfile.html
// Response: https://developer.companieshouse.gov.uk/api/docs/company/company_number/companyProfile-resource.html
async function getCompany(companyNumberAsString: string) {
  let uri = pathToUri(["company", companyNumberAsString]);
  return await get(uri, undefined);
}

// ------------------------------------------------------
// API: https://developer.companieshouse.gov.uk/api/docs/company/company_number/officers/officers.html
// Response: https://developer.companieshouse.gov.uk/api/docs/company/company_number/officers/officerList-resource.html
async function getCompanyOfficers(companyNumberAsString: string) {
  let uri = pathToUri(["company", companyNumberAsString, "officers"]);
  return await get(uri, undefined);
}

// ------------------------------------------------------
// API: https://developer.companieshouse.gov.uk/api/docs/officers/officer_id/appointments/appointmentList.html
// Response: https://developer.companieshouse.gov.uk/api/docs/officers/officer_id/appointments/appointmentList-resource.html
async function getResource(officerUri: string) {
  return await get(officerUri, undefined);
}

// ------------------------------------------------------
async function getPdfMetaResource(fullUrl: any) {
  return await httpGetJSON(fullUrl);
}

// ------------------------------------------------------
// async function getPdf(fullUrl) {

//   Utilities.log('http pdf get: ' + fullUrl);

//     let response = await fetch(fullUrl, {headers: PREMIUM_HEADERS})
//     .then(async (response) => {
//       if (response.status >= 200 && response.status < 300) {
//         let url = await response.url;
//         Utilities.log('http ok. pdf url is: ');
//         return  url;
//       } else {
//         console.error('http error: ' + response.status);
//         {error: response.status}
//       }
//     })
//     .then((url) => {
//       return url;
//     })
//     .catch((error) => {
//       console.error('http error: ' + error);
//     });

//     return response;
//   }

// // ------------------------------------------------------
//   function getPdfHeaders() {
//     return PREMIUM_HEADERS;
//   }

// ------------------------------------------------------
// Local Functions
// ------------------------------------------------------
async function get(uri: any, querySearchString:any) {

  let fullUri = API_ENDPOINT + uri;
  if (querySearchString != undefined) {
    fullUri = fullUri + '?q=' + querySearchString;
  } else {
    fullUri = fullUri + '?items_per_page=100';
  }

  Utilities.log('http get: ' + fullUri);

  return await httpGetJSON(fullUri);
}

// ------------------------------------------------------
async function httpGetJSON(fullUri: any) {

  let response = await fetch(fullUri, {headers: HEADERS})
  .then(async (response) => {
    if (response.status >= 200 && response.status < 300) {
      Utilities.log('http ok')
      let responseJson = await response.json();
      return responseJson;
    } else {
      console.error('http error: ' + response.status);
      // {error: response.status}
    }
  })
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error('http error: ' + error);
  });

  return response;
}

// ------------------------------------------------------
function pathToUri(path: any) {
  return "/" + path.join('/')
}

// ------------------------------------------------------
// Macros
// ------------------------------------------------------
const API_ENDPOINT = "https://api.companieshouse.gov.uk";

// if (__DEV__) {
//     // dev
 const   HEADERS = {"Authorization": "Basic MU5RVDZyNUJBMUJhWUJSZWlYOTRUSFd3bjZuQkNFbjdhV1F4Z2tEdTo="};
const PREMIUM_HEADERS = HEADERS;
// } else {
//     // com.deltagain.companydg.v1.content
//     HEADERS = {"Authorization": "Basic NC1CZ1p4ZHJ4ZEtGN0x2WllGcW5pUjV0dHBLSlNRTUJKT0JnZXBqczo="};

//     // com.deltagain.companydg.v1.premium
//     PREMIUM_HEADERS = {"Authorization": "Basic bVc5X0l0cGlNS3EyWUdJTVJjRDJqOEk3X0F3aXJBU19qTl9OUjRCaDo="};
// }
