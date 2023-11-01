library(sf)
library(tidyverse)
library(geojsonsf)

map <- sf::st_read("SIRGAS_SHP_logradouronbl_line.shp")

map_Crs <- st_set_crs(map, 31983)

sf::st_crs(map) <- 31983
# https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork/srv/eng/catalog.search;jsessionid=A62B4D2376CD55D237AA043498078D5D#/metadata/620ed7e9-c4f7-4111-a268-346514a2b135

map_trans <- st_transform(map_Crs, crs = 4326)

ggplot(map) + geom_sf() #+ xlim(c(320000, 330000)) + ylim(c(7370000,7380000))
ggplot(map_trans) + geom_sf() + ylim(c(-23.8, -23.7)) + xlim(c(-46.8, -46.7))

mgeo <- sf_geojson(map_trans, digits = 6)

write(mgeo, 'logradouros-sp.geojson')


