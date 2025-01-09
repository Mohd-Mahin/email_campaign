For Deployment:
[1] Visit https://dashboard.render.com/ and sign with github profile.
[2] email-campaign is the service name.
[3] https://email-campaign-na5c.onrender.com/ Url for the serivce deployed.
[4] Code pushed to the "main" branch is automatically deployed.
[5]

NGROK - for local testing of webhook data. https://dashboard.ngrok.com/get-started/setup/macos
STEP TO RUN:
[1] open a new terminal and run command: ngrok http http://localhost:8000
[2] Copy the url path in `Forwarding` section and paste this inside Sendgrid > Settings > Mail Settings > Event Webhook.
[3] Add event webhook if doesn't exist.
