import { Module, OnModuleInit } from '@nestjs/common';
import { Campaign } from './domain/campaign';
import { CampaignFakeRepository } from './repo/campaign.repo';

@Module({
    imports: [],
    controllers: [],
    providers: [Campaign, CampaignFakeRepository],
})
export class CampaignModule implements OnModuleInit {
    async onModuleInit() {
        // load all saved url stuff from DB to memory
    }
}
