import { Injectable } from "@angular/core";
import { ConfigurationService } from "ionic-configuration-service";

@Injectable()
export class AuthHelper {
	//function to parse the url query string
	private parseQueryString = function(url) {
		var params = {}, queryString = url.substring(1),
		regex = /([^&=]+)=([^&]*)/g, m;
		while (m = regex.exec(queryString)) {
			params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}
		return params;
	}
	private params = this.parseQueryString(location.hash);
	public access_token:string = null;

	constructor(private configurationService: ConfigurationService) {
		//check for id_token or access_token in url
		if (this.params["id_token"] != null)
			this.getAccessToken();
		else if (this.params["access_token"] != null)
			this.access_token = this.params["access_token"];
	}

	login() {
		//redirect to get id_token
		window.location.href = this.configurationService.getValue<string>("aadAuthority") +
			"/oauth2/authorize?response_type=id_token&client_id=" + this.configurationService.getValue<string>("aadClientId") +
			"&redirect_uri=" + encodeURIComponent(window.location.href) +
			"&state=SomeState&nonce=SomeNonce";
	}

	private getAccessToken() {
		//redirect to get access_token
		window.location.href = this.configurationService.getValue<string>("aadAuthority") +
			"/oauth2/authorize?response_type=token&client_id=" + this.configurationService.getValue<string>("aadClientId") +
			"&resource=" + this.configurationService.getValue<string>("aadGraphResource") +
			"&redirect_uri=" + encodeURIComponent(window.location.href) +
			"&prompt=none&state=SomeState&nonce=SomeNonce";
	}
}
