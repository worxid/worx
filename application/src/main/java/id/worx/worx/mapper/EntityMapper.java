package id.worx.worx.mapper;

public interface EntityMapper <IN, EN ,OU>{
    EN toEntity(IN in);

    OU toDto(EN en);
}
