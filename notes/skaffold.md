# Notes on GCP section 
- at the very end I couldnt get GCP or skaffold through GCP to build my image I had to run the following commands which were not shown in any of the videos or in notes 
```
gcloud config set project ticketing-dev-458621
gcloud storage buckets create gs://ticketing-dev-458621_cloudbuild --location=us-central1

```

