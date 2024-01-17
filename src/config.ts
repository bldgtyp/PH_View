// Project attributes
export const BLDGTYP_PROJ_NUM = "2305"
export const PHIUS_PROJ_NUM = "----"
export const PHIUS_DROPBOX_URL = ""
export const AIRTABLE_PROJECT_URL = "https://airtable.com/app64a1JuYVBs7Z1m/shrGOFlbFNWjWUPsj"

// Construct the API Endpoints
export const PROJ_ID = "proj_" + BLDGTYP_PROJ_NUM

let apiUrlBase = "https://ph-view.onrender.com/proj_2305"
if (process.env.REACT_APP_API_URL !== undefined) {
    apiUrlBase = process.env.REACT_APP_API_URL + PROJ_ID
}
export default apiUrlBase

export const apiUrlConfig = apiUrlBase + "/config";
export const apiUrlCertResult = apiUrlBase + "/cert_results";
export const apiUrlGlazingTypes = apiUrlBase + "/glazing_types";
export const apiUrlFrameTypes = apiUrlBase + "/frame_types";
export const apiUrlWindowUnitTypes = apiUrlBase + "/window_unit_types";
export const apiUrlErvUnits = apiUrlBase + "/erv_units";
export const apiUrlFans = apiUrlBase + "/fans";
export const apiUrlPumps = apiUrlBase + "/pumps";
export const apiUrlLighting = apiUrlBase + "/lighting";
export const apiUrlAppliances = apiUrlBase + "/appliances";
export const apiUrlMaterials = apiUrlBase + "/materials";
export const apiUrlConstructions = apiUrlBase + "/constructions";