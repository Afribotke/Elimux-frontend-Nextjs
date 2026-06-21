//
// Federation Module — Constants
// Shared constants for federations, clubs, teams, and licensing.
//

export const FEDERATION_ROLES = [
  \"player\",
  \"coach\",
  \"official\",
  \"referee\",
  \"administrator\",
  \"medical\",
  \"staff\",
] as const;

export const TEAM_CATEGORIES = [
  \"senior\",
  \"junior\",
  \"women\",
  \"men\",
  \"mixed\",
] as const;

export const LICENSE_STATUSES = [
  \"active\",
  \"expired\",
  \"revoked\",
  \"pending\",
] as const;

export const FEDERATION_DEFAULTS = {
  REQUIRE_LICENSE_FOR_MATCH: true,
  AUTO_EXPIRE_LICENSE_ON_DATE: true,
};