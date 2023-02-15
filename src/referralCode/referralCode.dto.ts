import { IsString, IsNumber } from "class-validator";

class CreateReferralCodeDto {
  @IsString()
  public code: string;

  @IsString()
  public description: string;

  @IsString()
  public type: string;

  @IsString()
  public by: string;

  @IsNumber()
  public created: number;
}

export default CreateReferralCodeDto;
