library(geobr)
library(sf)
library(jsonlite)
library(geojsonsf)
library(tidyverse)
library(rmapshaper)

mun <- read_municipality()

contagem_prefeitas <- read.csv('prefeitas_eleitas_mun.csv') %>% select(
  code_muni = codigo_ibge,
  FEMININO, 
  MASCULINO
)

nomes_prefeitas <- read.csv('df_prefeitos.csv') %>%
  filter(DS_GENERO == 'FEMININO') %>%
  select(code_muni = codigo_ibge,
         ANO_ELEICAO,
         NM_URNA_CANDIDATO) %>% 
  arrange(code_muni, ANO_ELEICAO) %>%
  mutate(nome = paste0(NM_URNA_CANDIDATO, ' (', ANO_ELEICAO, ')')) %>%
  select(-ANO_ELEICAO, -NM_URNA_CANDIDATO) %>%
  group_by(code_muni) %>%
  summarise(lista_nome_prefeitas = paste(nome, collapse = ';'))

mun_data <- mun %>%
  rmapshaper::ms_simplify(keep = 0.01) %>%
  left_join(contagem_prefeitas) %>%
  left_join(nomes_prefeitas)


ggplot(mun_data) + geom_sf(aes(fill = FEMININO), color = NA)

write(
  geojsonsf::sf_geojson(
    mun_data,
    digits = 6
  ),
  '../mun-data-very-simp.json'
)


br <- read_country()

# jsonlite::write_json(
#   geojsonsf::sf_geojson(
#     mun, digits = 6
#   ),
#   'mun-map.json'
# )

# write(
#   geojsonsf::sf_geojson(
#     rmapshaper::ms_simplify(mun, keep = 0.01), 
#     digits = 6
#   ),
#   'mun-map-very-simp.json'
# )
# 
# mun_simp <- rmapshaper::ms_simplify(mun, keep = 0.05) #0.01 etc.
# ggplot(mun_simp) + geom_sf() + ylim(c(-25,-15)) + xlim(c(-50, -35))


# brazil ------------------------------------------------------------------

ggplot(
  rmapshaper::ms_simplify(br, keep = 0.01)
) + geom_sf()

write(
  geojsonsf::sf_geojson(
    rmapshaper::ms_simplify(br, keep = 0.01), 
    digits = 6
  ),
  'map-br.json'
)
