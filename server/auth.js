// first, remove configuration entry in case service is already configured
Accounts.loginServiceConfiguration.remove({
  service: "github"
});
Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "9ac171254a57f6ddb718",
  secret: "cea73d6e89a833eb908583dd059906d500a9d761"
});