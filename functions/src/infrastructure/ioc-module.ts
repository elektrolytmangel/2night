import ConfigurationService from '../services/configuration.service';
import PartyService from '../services/party.service';

export default class IoCModule {
  private static partyService: PartyService | null = null;
  private static configurationService: ConfigurationService | null = null;
  
  public static getPartyService(): PartyService {
    if (!this.partyService) {
      this.partyService = new PartyService();
    }

    return this.partyService;
  }

  public static getConfigurationService(): ConfigurationService {
    if (!this.configurationService) {
      this.configurationService = new ConfigurationService();
    }

    return this.configurationService;
  }
}
