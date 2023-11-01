library(tidyverse)
library(sf)
library(geojsonsf)
library(rmapshaper)
library(geobr)

# dados daqui:
# http://dados.prefeitura.sp.gov.br/pt_PT/dataset/distritos/resource/9e75c2f7-5729-4398-8a83-b4640f072b5d

# lê os shapefiles
sp <- sf::read_sf('LAYER_DISTRITO')

# lê o csv com os números de favelas e domicílios
favelas <- read.csv("dados-favelas-2021.csv") #"favelas-distritos.csv")

# gera um vetor com os nomes dos distritos na forma como vieram no shapefile, mas em ordem alfabética
nomes_distritos <- sp %>%
  select(NOME_DIST) %>%
  arrange(NOME_DIST) %>%
  .$NOME_DIST

# adiciona esse vetor como uma coluna na tabela 
favelas$NOME_DIST <- nomes_distritos
# calcula percentual
favelas$pct <- round(100*favelas$ndf/favelas$ndp,2)
# categoria os percentuais
favelas$cat <- cut(favelas$ndf/favelas$ndp, c(-Inf, 0, 0.1, 0.2, 0.3, 1), c("Sem favelas", "Até 10%", "Entre 10% e 20%", "Entre 20% e 30%", "Acima de 30%"))

# faz um join do dataframe com os shapefiles e a tabela com os dados
sp_data <- sp %>% left_join(favelas)

# simplifica as geometrias (para o geojson ficar pequeno)
simple_sp <- rmapshaper::ms_simplify(sp_data)

# só uma transformação de projeção
sp_wgs84 <- sf::st_transform(simple_sp, 4326)
#sf::st_crs(sp_wgs84)

# plota
#ggplot(sp_wgs84) + geom_sf()

# converte em geojson
sp_geo <- geojsonsf::sf_geojson(sp_wgs84, simplify = TRUE, digits = 6)

# escreve o arquivo
write_file(sp_geo, 'dados_distritos.json')

#### acrescentando a fronteira, para facilitar o fitExtent do D3

# pega o município de SP do geobr
mun_sp <- geobr::read_municipality(3550308)

# converte para o mesmo CRS do shape dos distritos
sp_contorno_wgs84 <- sf::st_transform(mun_sp, 4326)

# converte para geojson
mun_sp_geo <- geojsonsf::sf_geojson(sp_contorno_wgs84, simplify = TRUE, digits = 6)

# escreve o arquivo
write_file(mun_sp_geo, 'contorno-sp.json')

