import { Module } from '@nestjs/common';
import { CredentialRepository } from '@src/modules/credential/credential.repository';

@Module({
  providers: [CredentialRepository],
  exports: [CredentialRepository],
})
export class CredentialModule {}
