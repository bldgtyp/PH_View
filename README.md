# PH-View
Passive House Database Viewer. 
Uses the [PH-View-AirTable API](https://github.com/bldgtyp/PH_View_AirTable).

## Key Dependencies:
- [React / Material UI]([text](https://mui.com/material-ui/getting-started/installation/))

## Setup
Set `./tsconfig.json`:    
- "target": "es6",`

## Run Locally (Dev):
1) Make sure `./.env.development.local` includes:
	- `"REACT_APP_API_URL=http://localhost:8000"`
2) `npm start`
3) View at [http://localhost:3000]()

## Deploy to GitHub Pages:
1) `src/data/constants.json` includes:
	- `"RENDER_API_BASE_URL": "https://ph-view-airtable-v1.onrender.com/"`
1) `./package.json` includes:
	- `"name": "ph_view"`
	- `"homepage": "https://ph-tools.github.io/PH_View/"`
2) Setup `deploy_app.yml` file in `./.github/workflows`
3) Deployed to GitHub Pages at: https://ph-tools.github.io/PH_View/
