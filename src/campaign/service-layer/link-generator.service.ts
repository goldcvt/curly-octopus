import { Injectable } from '@nestjs/common';
import { generateRandomUrl } from '../domain/link-generator/link-generator';
import { CampaignFakeRepository } from '../repo/campaign.repo';

@Injectable()
export class LinkGeneratorService {
    // Should inject like a cached factory or use a weird provider
    constructor(private campaignRepo: CampaignFakeRepository) {}
    async generateLink(): Promise<string> {
        let generatedUrl = generateRandomUrl();
        while (await this.campaignRepo.getBySourceUrl(generatedUrl)) {
            generatedUrl = generateRandomUrl();
        }
        return generatedUrl;
    }
}
