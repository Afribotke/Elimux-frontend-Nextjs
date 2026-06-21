//
// Federation Module — Test Utilities
// Provides a mock federation provider for testing and local development.
//

import { Federation, Club, Team, License } from "./types";

export class MockFederationProvider {
  private federations: Federation[] = [];
  private clubs: Club[] = [];
  private teams: Team[] = [];
  private licenses: License[] = [];

  // Federations
  createFederation(data: Federation): Federation {
    this.federations.push(data);
    return data;
  }

  listFederations(): Federation[] {
    return this.federations;
  }

  getFederation(id: string): Federation | undefined {
    return this.federations.find(f => f.id === id);
  }

  // Clubs
  createClub(data: Club): Club {
    this.clubs.push(data);
    return data;
  }

  listClubs(federationId: string): Club[] {
    return this.clubs.filter(c => c.federationId === federationId);
  }

  getClub(id: string): Club | undefined {
    return this.clubs.find(c => c.id === id);
  }

  // Teams
  createTeam(data: Team): Team {
    this.teams.push(data);
    return data;
  }

  listTeams(clubId: string): Team[] {
    return this.teams.filter(t => t.clubId === clubId);
  }

  getTeam(id: string): Team | undefined {
    return this.teams.find(t => t.id === id);
  }

  // Licenses
  issueLicense(data: License): License {
    this.licenses.push(data);
    return data;
  }

  listLicenses(federationId: string): License[] {
    return this.licenses.filter(l => l.federationId === federationId);
  }

  getLicense(id: string): License | undefined {
    return this.licenses.find(l => l.id === id);
  }
}



