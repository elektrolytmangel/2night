import { App } from 'firebase-admin/app';
import ConfigurationService from '../services/configuration.service';
import PartyService from '../services/party.service';
import { UserService } from '../services/user.service';

export default class ServiceRegistry {
  private static _partyService: PartyService | null = null;
  private static _configurationService: ConfigurationService | null = null;
  private static _userService: UserService | null = null;

  public static initialiazeServices(app: App) {
    this._partyService = new PartyService(app);
    this._configurationService = new ConfigurationService(app);
    this._userService = new UserService(app);
  }

  public static get partyService(): PartyService {
    if (!this._partyService) {
      throw new Error('PartyService not initialized');
    }

    return this._partyService;
  }

  public static get configurationService(): ConfigurationService {
    if (!this._configurationService) {
      throw new Error('ConfigurationService not initialized');
    }

    return this._configurationService;
  }

  public static get userService(): UserService {
    if (!this._userService) {
      throw new Error('UserService not initialized');
    }

    return this._userService;
  }
}
