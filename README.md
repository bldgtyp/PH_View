## See the [Backend](https://github.com/PH-Tools/PH_View)

## Installation / Setup:
1) `create-react-app ph-view-react`
1) `cd ph-view-react`
1) `npm install @mui/material @emotion/react @emotion/styled`

[*See Material-UI...*](https://mui.com/material-ui/getting-started/installation/)

## Run locally in Dev Mode:
1) Make sure `.env.development.local` is setup with:
   - `REACT_APP_API_URL=http://localhost:8000`
1) `npx start`0
1) View at [http://localhost:3000](http://localhost:8000)

## Deploy to GitHub Pages:
1) Make sure `package.json` is setup with:
    - `"homepage": "https://ph-tools.github.io/PH_View_React/"`
1) Setup [`deploy_app.yml`](https://github.com/PH-Tools/PH_View_React/blob/main/.github/workflows/deploy_app.yml) file in .github/workflows
1) Deployed to GitHub Pages at: [https://ph-tools.github.io/PH_View_React/](https://ph-tools.github.io/PH_View_React/)