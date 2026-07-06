// mappers/brand.mapper.ts
import { BrandEntity } from '../entities/brand.entity';
import type { BrandPublicResponseDTO, BrandSecureResponseDTO } from '../dto/brand/brand-auth.dto';

export class BrandMapper {
  static toPublicResponse(brand: BrandEntity): BrandPublicResponseDTO {
    return {
      id: brand._id.toString(),
      name: brand.name,
      email: brand.email,
      phone: brand.phone,
      website: brand.website,
      industry: brand.industry,
      companySize: brand.companySize,
      status: brand.status,
      verified: brand.verified,
      verificationStatus: brand.verificationStatus,
      createdAt: brand.createdAt,
    };
  }

  /**
   * Convert entity to secure response (for the brand itself)
   */
  static toSecureResponse(brand: BrandEntity): BrandSecureResponseDTO {
    // For now, same as public since no sensitive fields to hide
    return this.toPublicResponse(brand);
  }

  /**
   * Convert from database document (lean()) to entity
   */
  static toEntity(document: any): BrandEntity {
    return new BrandEntity({
      _id: document._id,
      name: document.name,
      email: document.email,
      password: document.password, // Only used internally!
      phone: document.phone,
      website: document.website,
      industry: document.industry,
      companySize: document.companySize,
      status: document.status,
      verified: document.verified,
      verificationStatus: document.verificationStatus,
      resetToken: document.resetToken,
      resetExpires: document.resetExpires,
      lastLoginAt: document.lastLoginAt,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
