//
// Federation Module — FederationService
// High-level orchestrator for federations, clubs, teams, and licensing.
//

import { Federation, Club, Team, License } from "./types";
import { federationHttpRequest } from "./http";

export class FederationService {
  constructor(private basePath: string = \"/federation\") {}

  // -----------------------------
  // Federation
  // -----------------------------
  async createFederation(data: Federation): Promise<Federation> {
    return federationHttpRequest<Federation>(\\/federations\, {
      method: \"POST\",
      body: JSON.stringify(data),
    });
  }

  async listFederations(): Promise<Federation[]> {
    return federationHttpRequest<Federation[]>(\\/federations\);
  }

  async getFederation(id: string): Promise<Federation> {
    return federationHttpRequest<Federation>(\\/federations/\\);
  }

  // -----------------------------
  // Clubs
  // -----------------------------
  async createClub(data: Club): Promise<Club> {
    return federationHttpRequest<Club>(\\/clubs\, {
      method: \"POST\",
      body: JSON.stringify(data),
    });
  }

  async listClubs(federationId: string): Promise<Club[]> {
    return federationHttpRequest<Club[]>(\\/federations/\/clubs\);
  }

  async getClub(id: string): Promise<Club> {
    return federationHttpRequest<Club>(\\/clubs/\\);
  }

  // -----------------------------
  // Teams
  // -----------------------------
  async createTeam(data: Team): Promise<Team> {
    return federationHttpRequest<Team>(\\/teams\, {
      method: \"POST\",
      body: JSON.stringify(data),
    });
  }

  async listTeams(clubId: string): Promise<Team[]> {
    return federationHttpRequest<Team[]>(\\/clubs/\/teams\);
  }

  async getTeam(id: string): Promise<Team> {
    return federationHttpRequest<Team>(\\/teams/\\);
  }

  // -----------------------------
  // Licensing
  // -----------------------------
  async issueLicense(data: License): Promise<License> {
    return federationHttpRequest<License>(\\/licenses\, {
      method: \"POST\",
      body: JSON.stringify(data),
    });
  }

  async listLicenses(federationId: string): Promise<License[]> {
    return federationHttpRequest<License[]>(\\/federations/\/licenses\);
  }

  async getLicense(id: string): Promise<License> {
    return federationHttpRequest<License>(\\/licenses/\\);
  }
}



