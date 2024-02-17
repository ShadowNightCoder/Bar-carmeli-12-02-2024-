export interface CitiesData {
    Rank: string;
    Key: string;
    LocalizedName: string;
    Country: {
      ID: string;
      LocalizedName: string;
    };
    AdministrativeArea: {
      ID: string;
      LocalizedName: string;
    };
  }

