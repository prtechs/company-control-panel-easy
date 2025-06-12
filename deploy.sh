
#!/bin/bash

echo "Building the project..."
npm run build

echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "Deployment complete!"
echo "Your dashboard should be available at: https://klypsotech-admin-dashboard.web.app"
