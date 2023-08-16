library(tidyverse)
library(sf)
library(geojsonsf)
library(rmapshaper)

# dados daqui:
# http://dados.prefeitura.sp.gov.br/pt_PT/dataset/distritos/resource/9e75c2f7-5729-4398-8a83-b4640f072b5d
sp <- sf::read_sf('LAYER_DISTRITO')

simple_sp <- rmapshaper::ms_simplify(sp)

sp_wgs84 <- sf::st_transform(simple_sp, 4326)
#sf::st_crs(sp_wgs84)

ggplot(sp_wgs84) + geom_sf()

sp_geo <- geojsonsf::sf_geojson(sp_wgs84, simplify = TRUE, digits = 6)

write_file(sp_geo, 'dados2.json')
