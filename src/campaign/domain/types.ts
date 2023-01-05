export type TargetURLData = {
    targetUrl: string;
    visits: number;
    conversions?: number;
};

export type TargetsVisitsData = Exclude<TargetURLData, 'conversions'>[];

export type TargetsConversionsData = Required<TargetURLData>[];

export type TargetsData = TargetURLData[];

export type Visit = {
    clickedUrl: string;
    visitedUrl: string;
    ip?: string;
    originalUtmCampaign: string | undefined;
    originalUtmMedium: string | undefined;
    originalUtmSource: string | undefined;
    originalUtmTerm: string | undefined;
    originalUtmContent: string | undefined;
    utmCampaign: string | undefined;
    utmMedium: string | undefined;
    utmSource: string | undefined;
    utmTerm: string | undefined;
    utmContent: string | undefined;
};

export class CampaignExistsError extends Error {
    name = 'CampaignExists';
}

export class CampaignNotExists extends Error {
    name = 'CampaignDoesNotExist';
}
