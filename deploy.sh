
#!/bin/bash

# Nombre del bucket S3
BUCKET="parking-ucaldas-aws"

echo "🔨 Compilando proyecto Angular..."
ng build --configuration production

echo "🧹 Eliminando archivos antiguos del bucket..."
aws s3 rm s3://$BUCKET --recursive

echo "⬆️ Subiendo nueva versión..."
aws s3 cp dist/frontendParkingUC/browser s3://$BUCKET --recursive

echo "✅ Deploy completado con éxito!"
echo "🌐 Puedes acceder a tu aplicación en: http://$BUCKET.s3-website-us-east-2.amazonaws.com"
