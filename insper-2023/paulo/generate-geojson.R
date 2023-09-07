library(tidyverse)
library(sf)
library(geojsonsf)
library(rmapshaper)
library(geobr)

# dados daqui:
# http://dados.prefeitura.sp.gov.br/pt_PT/dataset/distritos/resource/9e75c2f7-5729-4398-8a83-b4640f072b5d
sp <- sf::read_sf('LAYER_DISTRITO')

favelas <- read.csv("favelas-distritos.csv")

nomes_distritos <- sp %>%
  select(NOME_DIST) %>%
  arrange(NOME_DIST) %>%
  .$NOME_DIST

favelas$NOME_DIST <- nomes_distritos

favelas$pct <- round(100*favelas$ndf/favelas$ndp,2)
favelas$cat <- cut(favelas$ndf/favelas$ndp, c(-Inf, 0, 0.1, 0.2, 0.3, 1), c("Sem favelas", "Até 10%", "Entre 10% e 20%", "Entre 20% e 30%", "Acima de 30%"))

sp_data <- sp %>% left_join(favelas)

simple_sp <- rmapshaper::ms_simplify(sp_data)



sp_wgs84 <- sf::st_transform(simple_sp, 4326)
#sf::st_crs(sp_wgs84)

ggplot(sp_wgs84) + geom_sf()

sp_geo <- geojsonsf::sf_geojson(sp_wgs84, simplify = TRUE, digits = 6)

write_file(sp_geo, 'dados_distritos.json')

#### acrescentando a fronteira, para facilitar o fitExtent do D3

mun_sp <- geobr::read_municipality(3550308)
mun_sp_geo <- geojsonsf::sf_geojson(sp_wgs84, simplify = TRUE, digits = 6)

#ggplot(sp_wgs84) + geom_sf() + geom_sf(data = simples_mun_sp, color = "blue", fill = "transparent")

write_file(mun_sp_geo, 'dados_municipio.json')
