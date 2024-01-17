# PH-View
Passive House Database Viewer

## Setup
Set `tsconfig.json`:    
- "target": "es6",`

Set `src/config.ts`:
- BLDGTYP_PROJ_NUM
- AIRTABLE_PROJECT_URL
- apiUrlBase

## Key Dependencies:
- [Material UI]([text](https://mui.com/material-ui/getting-started/installation/))

## Run Locally (Dev):
1) Make sure `.env.development.local` includes:
	- "REACT_APP_API_URL=http://localhost:8000"
2) `npm start`
3) View at [http://localhost:3000]()

## Deploy to GitHub Pages:
1) Make sure `package.json` is setup with:
	- "name": "PH_view",
	- "homepage": "https://ph-tools.github.io/PH_View/",
2) Setup deploy_app.yml file in .github/workflows
3) Deployed to GitHub Pages at: https://ph-tools.github.io/PH_View/
