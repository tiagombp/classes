library(tidyverse)
library(geobr)
library(sf)
library(geojsonsf)

estados <- geobr::read_state()
saveRDS(estados, 'estados.rds')

estados <- readRDS('estados.rds')

estados_simp <- rmapshaper::ms_simplify(estados, keep = 0.05) #st_simplify(estados, dTolerance = 100)

ggplot(estados_simp) + geom_sf()

write_file(
  sf_geojson(estados_simp, 
             simplify = TRUE, digits = 6),
  'estados.json')
