const fuzzy = require('fuzzy');

var names = `Aurora Black
Aurora Blue
Blackstone Barrier Reef Blue 
Caran d'Ache Caribbean Sea
Caran d'Ache Cosmic Black
Caran d'Ache Delicate Green
Caran d'Ache Divine Pink
Caran d'Ache Hypnotic Turquoise
Caran d'Ache Infra Red
Caran d'Ache UltraViolet
Chesterfield Amethyst
Chesterfield Antique Jade
Chesterfield Antique Walnut
Chesterfield Antique Yankee
Chesterfield Fire Opal
Chesterfield Garnet
Chesterfield Siam
Chesterfield Smoked Topaz
Chesterfield Teal
De Atramentis Alexander Hamilton
De Atramentis Aubergine
De Atramentis Black-Brown
De Atramentis Elderberries
De Atramentis Fog Grey
De Atramentis Herbs de Provence
De Atramentis Hyacinth
De Atramentis Indigo Blue
De Atramentis Jane Austen
De Atramentis Khaki
De Atramentis Lilac
De Atramentis Midnight Blue
De Atramentis Petrol
De Atramentis Pigeon Blue
De Atramentis R.L. Stevenson
De Atramentis Rose
De Atramentis Sepia Brown
De Atramentis Steel Blue
De Atramentis Violets
Diamine Ancient Copper
Diamine Apple Glory
Diamine Aqua Lagoon
Diamine Asa Blue
Diamine Autumn Oak
Diamine Bilberry
Diamine Blue Velvet
Diamine Burnt Sienna
Diamine Cerise
Diamine Chocolate Brown
Diamine Classic Red
Diamine Coral
Diamine Crimson
Diamine Denim
Diamine Eau de Nil
Diamine Eclipse
Diamine Emerald
Diamine Golden Brown
Diamine Grape
Diamine Graphite
Diamine Hope Pink
Diamine Imperial Purple
Diamine Jade Green
Diamine Kelly Green
Diamine Macassar
Diamine Majestic Blue
Diamine Majestic Purple
Diamine Marine
Diamine Matador
Diamine Meadow
Diamine Mediterranean Blue
Diamine Midnight Ink
Diamine Monaco Red
Diamine Ochre
Diamine Onyx Black
Diamine Orange
Diamine Oxblood
Diamine Peach Haze
Diamine Poppy Red
Diamine Prussian Blue
Diamine Pumpkin
Diamine Raw Sienna
Diamine Red Dragon
Diamine Regency Blue
Diamine Registrar's Blue Black
Diamine Saddle Brown
Diamine Safari
Diamine Salamander
Diamine Sargasso Sea
Diamine Sepia
Diamine Sherwood Green
Diamine Shimmertastic Blue Lightning
Diamine Shimmertastic Blue Pearl
Diamine Shimmertastic Brandy Dazzle
Diamine Shimmertastic Golden Sands
Diamine Shimmertastic Magical Forest
Diamine Shimmertastic Purple Pazazz
Diamine Shimmertastic Red Lustre
Diamine Shimmertastic Shimmering Seas
Diamine Silver Fox
Diamine Soft Mint
Diamine Steel Blue
Diamine Sunset
Diamine Sunshine Yellow
Diamine Syrah
Diamine Teal
Diamine Terracotta
Diamine Twilight
Diamine Ultra Green
Diamine Wild Strawberry
Diamine Woodland Green Ink
Franklin Christoph Terra Firma
Graf Von Faber Castell Carbon Black
Graf von Faber Castell Hazelnut Brown
Graf von Faber Castell Stone Grey
Graf von Faber-Castell Deep Sea Green
Hero 231 Red
Hero 232 blue/black
Hero 233 blue
Hero 234 black
J Herbin 1670 Emerald of Chivor
J Herbin 1670 Rouge Hematite
J Herbin 1670 Stormy Gray
J Herbin Cacao du Brésil
J Herbin Cafe des Iles
J Herbin Lie de The
J Herbin Lierre Sauvage
J Herbin Orange Indien
J Herbin Perle Noir
J Herbin Poussiere de Lune
J Herbin Vert Olive
J Herbin Vert Pre
J Herbin Vert Reseda
J. Herbin Rouge Caroubier
J. Herbin Vert Empire
Kaweco Palm Green
Kaweco Paradise Blue
KWZI #20
KWZI #26
KWZI #27
KWZI #38
KWZI #46
KWZI #47
KWZI Azure #4
KWZI Cherry
KWZI Grass Green
KWZI GummiBerry
KWZI Honey
KWZI Iron Gall Gold
KWZI Iron Gall Gummiberry
KWZI Iron Gall Turquoise
KWZI Menthol Green
KWZI Old Gold
Lamy Dark Lilac
Lamy Neon Lime
Lamy Turquoise
Levenger Cardinal Red
Levenger Greystoke
Levenger Pinkly
Levenger True Teal
Maruzen Athena: Black
Montblanc Corn Poppy Red
Montblanc for BMW
Montblanc Honore de Balzac Dandy Turquoise
Montblanc Irish Green
Montblanc Lavender Purple
Montblanc Mystery Black
Montblanc Oyster Grey
Montblanc Pink
Montblanc Racing Green
Montblanc Royal Blue
Montblanc Toffee Brown
Montblanc Violet
Montegrappa Bordeaux
Monteverde Brown
Noodler's #41 Brown
Noodler's 54th Massachusetts
Noodler's Air Corp Blue Black
Noodler's Antietam
Noodler's Apache Sunset
Noodler's Army Green
Noodler's Bad Belted Kingfisher
Noodler's Bad Blue Heron
Noodler's Baystate Blue
Noodler's Baystate Concord Grape
Noodler's Baystate Cranberry
Noodler's Beaver
Noodler's Bernanke Black
Noodler's Bernanke Blue
Noodler's Berning Red
Noodler's Black 2
Noodler's Black Eel
Noodler's Black Swan in Australian Roses
Noodler's Bluerase
Noodler's Borealis Black
Noodler's Brown
Noodler's Bulletproof Black
Noodler's Burgundy
Noodler's Burma Road Brown
Noodler's Cactus Fruit Eel
Noodler's Cayenne
Noodler's Concord Bream
Noodler's Dark Matter
Noodler's Dragon Catfish Green
Noodler's Dragon Napalm
Noodler's El Lawrence
Noodler's Firefly
Noodler's Fox
Noodler's General of the Armies
Noodler's Golden Brown
Noodler's Green Marine
Noodler's Gruene Cactus
Noodler's Gruene Cactus  Eel 
Noodler's Habanero
Noodler's Heart of Darkness
Noodler's Hellfire HL
Noodler's Hunter Green
Noodler's Inkyman Sapphire
Noodler's Kiowa Pecan
Noodler's Kung-Te-Cheng
Noodler's La Couleur Royale
Noodler's La Couleur Royale 2
Noodler's La Reine Mauve
Noodler's Lexington Gray
Noodler's Liberty's Elysium
Noodler's Lightning Blue
Noodler's Luxury Blue
Noodler's Navajo Turquoise
Noodler's Navy
Noodler's Nightshade
Noodler's Nikita
Noodler's Ottoman Azure
Noodler's Park (Sang Hak) Red
Noodler's Polar Blue
Noodler's Purple
Noodler's Purple Wampum
Noodler's Rachmaninoff
Noodler's Red
Noodler's Red-Black
Noodler's Rome Burning
Noodler's Saguaro Wine
Noodler's Sequoia
Noodler's Shah's Rose
Noodler's Squeteague
Noodler's Turquoise
Noodler's Turquoise Eel
Noodler's V-Mail Burma Road Brown
Noodler's V-Mail GI Green
Noodler's V-Mail Mandalay Maroon
Noodler's V-Mail Midway Blue
Noodler's V-Mail North African Violet
Noodler's V-Mail Operation Overlord Orange
Noodler's V-Mail Rabual Red
Noodler's Violet
Noodler's Walnut
Noodler's X-feather
Noodler's Yellow
Noodler's Zhivago
Omas Green
Omas Turquoise
Omas Violet
Organics Studio Blue Merle
Organics Studio Edgar Allan Poe
Organics Studio Jane Austen
Organics Studio John Hancock
Organics Studio Join or Die
Organics Studio Marie Curie's Radium
Organics Studio Mercury
Organics Studio Walt Whitman
P.W. Akkerman #21 ChinaTown Red
Parker Penman Sapphire
Parker Quink Blue-Black
Parker Quink MicroFilm Black for VMAIL
Pelikan Brilliant Black
Pelikan Edelstein Amber (Ink of the year 2013)
Pelikan Edelstein Amethyst
Pelikan Edelstein Aquamarine
Pelikan Edelstein Aventurine
Pelikan Edelstein Garnet (Ink of the year 2014)
Pelikan Edelstein Jade
Pelikan Edelstein Mandarin
Pelikan Edelstein Onyx
Pelikan Edelstein Tanzanite
Pelikan Edelstein Topaz
Pelikan Edelstein Turmaline (Ink of the year 2012)
Pelikan Fount India
Pelikan m205 Duo Green Highlighter
Pilot Iroshizuku Aji-sai
Pilot Iroshizuku Ama-Iro
Pilot Iroshizuku Asa-gao
Pilot Iroshizuku Chiku-Rin
Pilot Iroshizuku Fuyu-gaki
Pilot Iroshizuku Fuyu-Syogun
Pilot Iroshizuku Kon-peki
Pilot Iroshizuku Kosumosu
Pilot Iroshizuku Ku-jaku
Pilot Iroshizuku Mom-iji
Pilot Iroshizuku Murasaki-Shikibu
Pilot Iroshizuku Shin-Kai
Pilot Iroshizuku Shin-ryoku
Pilot Iroshizuku Syo-ro
Pilot Iroshizuku Take-Sumi
Pilot Iroshizuku Tsuki-yo
Pilot Iroshizuku Tsukushi
Pilot Iroshizuku Tsutsuji
Pilot Iroshizuku Tsuyu-kusa
Pilot Iroshizuku Yama-Budo
Pilot Iroshizuku Yu-yake
Platinum Carbon Black
Private Reserve American Blue
Private Reserve Arabian Rose
Private Reserve Avacado
Private Reserve Black Cherry
Private Reserve Blue Suede (new formula)
Private Reserve Blue Suede (original)
Private Reserve Burgundy Mist
Private Reserve Buttercup
Private Reserve Cadillac Green
Private Reserve Candy Apple Red Chromium
Private Reserve Chocolat
Private Reserve Copper Burst
Private Reserve Dakota Red
Private Reserve DC Supershow Blue
Private Reserve DC Supershow Violet
Private Reserve Ebony Blue
Private Reserve Electric DC Blue
Private Reserve Gray Flannel
Private Reserve Lake Placid Blue
Private Reserve Midnight Blues
Private Reserve Naples Blue
Private Reserve Orange Crush
Private Reserve Plum
Private Reserve Purple Mojo
Private Reserve Sepia
Private Reserve Sherwood Green
Private Reserve Shoreline Gold
Private Reserve Shoreline Gold
Private Reserve Sonic Blue
Private Reserve Spearmint
Private Reserve Tanzanite Ink
Private Reserve Tropical Blue
Private Reserve Vampire Red
Robert Oster Signature Australian Sky
Robert Oster Signature Blue Sea
Robert Oster Signature Bondi Blue
Robert Oster Signature Deep sea
Robert Oster Signature Emerald
Robert Oster Signature Tranquility
Rohrer & Klingner Alt-Goldgrun
Rohrer & Klingner Helianthus
Rohrer & Klingner Salix
Rohrer & Klingner Scabiosa
Rohrer & Klingner Sepia
Rohrer & Klingner Solferino
Rohrer & Klingner Verdura
Sailor BungBox 88 Green Tea
Sailor BungBox Cherry Blossom
Sailor BungBox Fresh Oranges of Lake Hamana
Sailor BungBox Fuji Blue
Sailor BungBox Hatsuyume Aofuji
Sailor BungBox June Bride
Sailor BungBox Kotohogi Kurenai
Sailor BungBox L'Amant
Sailor BungBox Mother Pink
Sailor BungBox Norwegian Wood
Sailor BungBox Omaezaki Sea
Sailor BungBox Omaezaki Sky
Sailor BungBox Omaezaki Sunset
Sailor BungBox Piano mahogany
Sailor BungBox Sapphire
Sailor BungBox Sweet Love Pink
Sailor BungBox Sweet Potato Purple
Sailor BungBox Sweet Potato Yellow
Sailor BungBox Tangerine
Sailor BungBox Tears of a Clown Ruby
Sailor BungBox Tsuyuhikari Light Soup Green
Sailor BungBox Valentines chocolate
Sailor Jentle Apricot
Sailor Jentle Chu-Shu
Sailor Jentle Doyou
Sailor Jentle Fuji-Musume
Sailor Jentle Grenade
Sailor Jentle Irori
Sailor Jentle Miruai
Sailor Jentle Osmanthus
Sailor Jentle Rikyu-Cha
Sailor Jentle Sakura Mori
Sailor Jentle Shigure
Sailor Jentle Sky High
Sailor Jentle Souten
Sailor Jentle Tokiwa Matsu
Sailor Jentle Waka-Uguisu
Sailor Jentle Yama-dori
Sailor Jentle Yuki-Akari
Sailor Kingdom Note Dorcus Hopei Binodulosus
Sailor Kiwa-Guro
Sailor Nano Sei Boku
Sailor Nioi-Sumire
Sailor Oku Yama
Sailor Storia Balloon Green
Sailor Storia Clown Yellow Green
Sailor Storia Dancer Pink
Sailor Storia Fire Red
Sailor Storia Lion Light Brown
Sailor Storia Magic Purple
Sailor Storia Night Blue
Sailor Storia Spotlight Yellow
Sanford's Penit Cardinal Red
Seitz-Kreuznach Cinnamon Brown - Zimtbraun
Seitz-Kreuznach Dark Orchid - Orchideen Violett
Sheaffer Blue/Black
Sheaffer Brown
Sheaffer King's Gold
Sheaffer Skrip Lavender
Sheaffer Skrip Red
Sheaffer Washable Blue
Stipula Sepia
Toucan Sienna
Visconti Blue
Visconti Sepia
Visconti Turquoise
Waterman Audacious Red
Waterman Harmonious Green
Waterman Inspired Blue`

var links = `http://i.imgur.com/Gw0bxL8.jpg
http://i.imgur.com/cvsUOgQ.jpg
http://i.imgur.com/MxAlFKB.jpg
http://i.imgur.com/nR374aR.jpg
http://i.imgur.com/QjcUuKZ.jpg
http://i.imgur.com/3reRxcc.jpg
http://i.imgur.com/e5Zrwhh.jpg
http://i.imgur.com/17lPYSS.jpg
http://i.imgur.com/BRMR7RG.jpg
http://i.imgur.com/h7TvTYW.jpg
http://i.imgur.com/FvG4275.jpg
http://i.imgur.com/d02ChI5.jpg
http://i.imgur.com/X7rQty0.jpg
http://i.imgur.com/De23RWM.jpg
http://i.imgur.com/GwKxCMa.jpg
http://i.imgur.com/Zc8uP6F.jpg
http://i.imgur.com/mBAyt7t.jpg
http://i.imgur.com/3ItvHAx.jpg
http://i.imgur.com/5NFNt67.jpg
http://i.imgur.com/yP4GjU5.jpg
http://i.imgur.com/tD6VN35.jpg
http://i.imgur.com/aXDF0HV.jpg
http://i.imgur.com/6uxnfxJ.jpg
http://i.imgur.com/8RaL0MU.jpg
http://i.imgur.com/arMwPlb.jpg
http://i.imgur.com/InFujUd.jpg
http://i.imgur.com/JDv5LxS.jpg
http://i.imgur.com/nAC36gi.jpg
http://i.imgur.com/T6wdpLO.jpg
http://i.imgur.com/Dj5naMZ.jpg
http://i.imgur.com/dm3SSZM.jpg
http://i.imgur.com/K8o2o9G.jpg
http://i.imgur.com/ek4Zb1Q.jpg
http://i.imgur.com/MA6PG6o.jpg
http://i.imgur.com/g7Aog2N.jpg
http://i.imgur.com/lZcNFV4.jpg
http://i.imgur.com/pCon4xx.jpg
http://i.imgur.com/ZCvwg6S.jpg
http://i.imgur.com/xrusJuV.jpg
http://i.imgur.com/9dWwrqI.jpg
http://i.imgur.com/wBu648G.jpg
http://i.imgur.com/3b0jAaB.jpg
http://i.imgur.com/i2ANFf2.jpg
http://i.imgur.com/2rxsbY9.jpg
http://i.imgur.com/Qd5xwG8.jpg
http://i.imgur.com/9OSvhud.jpg
http://i.imgur.com/72a7AGu.jpg
http://i.imgur.com/1N2A8xY.jpg
http://i.imgur.com/GvdzLgL.jpg
http://i.imgur.com/PjjgLy6.jpg
http://i.imgur.com/IKFbmi8.jpg
http://i.imgur.com/Su2qxPb.jpg
http://i.imgur.com/WGT2BrJ.jpg
http://i.imgur.com/fplz6jv.jpg
http://i.imgur.com/blVnpvE.jpg
http://i.imgur.com/leZa5tz.jpg
http://i.imgur.com/OIeVrbd.jpg
http://i.imgur.com/rBPtFLQ.jpg
http://i.imgur.com/QN4wvKz.jpg
http://i.imgur.com/HCAXSoL.jpg
http://i.imgur.com/TpekLSX.jpg
http://i.imgur.com/Z4iAur0.jpg
http://i.imgur.com/tiZCxeY.jpg
http://i.imgur.com/S1SPTQz.jpg
http://i.imgur.com/NxlluVu.jpg
http://i.imgur.com/q0FxRs2.jpg
http://i.imgur.com/Nulnxkw.jpg
http://i.imgur.com/VRWnMdW.jpg
http://i.imgur.com/ubYYrFA.jpg
http://i.imgur.com/I2cZdQy.jpg
http://i.imgur.com/uqOIcnf.jpg
http://i.imgur.com/XtmMRzn.jpg
http://i.imgur.com/FFzXKGZ.jpg
http://i.imgur.com/qQxHJlp.jpg
http://i.imgur.com/USEwJLz.jpg
http://i.imgur.com/uUi24Vf.jpg
http://i.imgur.com/BySaZk8.jpg
http://i.imgur.com/hcHjSa6.jpg
http://i.imgur.com/1xoJu0G.jpg
http://i.imgur.com/UfefJev.jpg
http://i.imgur.com/yaxe190.jpg
http://i.imgur.com/sz4qzvv.jpg
http://i.imgur.com/vzzFEiu.jpg
http://i.imgur.com/IflWiLG.jpg
http://i.imgur.com/giz0Rjc.jpg
http://i.imgur.com/kvZk4er.jpg
http://i.imgur.com/8bOfZAz.jpg
http://i.imgur.com/9blJWAY.jpg
http://i.imgur.com/0sK642O.jpg
http://i.imgur.com/Ur8P9BF.jpg
http://i.imgur.com/Tgmmo4h.jpg
http://i.imgur.com/N05CxxF.jpg
http://i.imgur.com/NuiaWGT.jpg
http://i.imgur.com/z96nrHw.jpg
http://i.imgur.com/zb1sKhh.jpg
http://i.imgur.com/BIqm6Me.jpg
http://i.imgur.com/xmt9EK9.jpg
http://i.imgur.com/KYXfbbM.jpg
http://i.imgur.com/WOBKXr9.jpg
http://i.imgur.com/QVnrvuE.jpg
http://i.imgur.com/bdpOEcv.jpg
http://i.imgur.com/PDvlB9K.jpg
http://i.imgur.com/lIFyhPc.jpg
http://i.imgur.com/ElZniVe.jpg
http://i.imgur.com/4pgp0KW.jpg
http://i.imgur.com/QghvMel.jpg
http://i.imgur.com/OjMF0sD.jpg
http://i.imgur.com/dJHi8vu.jpg
http://i.imgur.com/aKuYkm9.jpg
http://i.imgur.com/WZoeP0I.jpg
http://i.imgur.com/RPssYGe.jpg
http://i.imgur.com/BQtSoJS.jpg
http://i.imgur.com/0EirfAI.jpg
http://i.imgur.com/uVHbBYu.jpg
http://i.imgur.com/LkMVhl3.jpg
http://i.imgur.com/KpPOo4j.jpg
http://i.imgur.com/KS3pu1C.jpg
http://i.imgur.com/MhEY6fd.jpg
http://i.imgur.com/eEZYuNZ.jpg
http://i.imgur.com/xpkIKYz.jpg
http://i.imgur.com/4lAmZe0.jpg
http://i.imgur.com/xAzu3Lg.jpg
http://i.imgur.com/eIrGFLv.jpg
http://i.imgur.com/8SSmkpH.jpg
http://i.imgur.com/xg2vAxK.jpg
http://i.imgur.com/TNS5N7W.jpg
http://i.imgur.com/yb7oqQ5.jpg
http://i.imgur.com/m8Dhomh.jpg
http://i.imgur.com/ZAfStGC.jpg
http://i.imgur.com/qP1S0B6.jpg
http://i.imgur.com/mE6bP2v.jpg
http://i.imgur.com/5qV6K7z.jpg
http://i.imgur.com/wv1C1um.jpg
http://i.imgur.com/PVHhMSD.jpg
http://i.imgur.com/hMlmh3W.jpg
http://i.imgur.com/KLxI2i6.jpg
http://i.imgur.com/GDmLCvo.jpg
http://i.imgur.com/eT3HGCq.jpg
http://i.imgur.com/e95zLxa.jpg
http://i.imgur.com/8o2qOKO.jpg
http://i.imgur.com/ueRhd4J.jpg
http://i.imgur.com/Qp50en2.jpg
http://i.imgur.com/vMQj9KL.jpg
http://i.imgur.com/MQw8k9B.jpg
http://i.imgur.com/QaO3rIG.jpg
http://i.imgur.com/6OKSaIE.jpg
http://i.imgur.com/6htq0vP.jpg
http://i.imgur.com/2bXuNx2.jpg
http://i.imgur.com/1GvzT42.jpg
http://i.imgur.com/k7f4Mqi.jpg
http://i.imgur.com/55VhqK4.jpg
http://i.imgur.com/vEUnshz.jpg
http://i.imgur.com/MayjWqd.jpg
http://i.imgur.com/MPmS9GO.jpg
http://i.imgur.com/Uijb361.jpg
http://i.imgur.com/GidLngs.jpg
http://i.imgur.com/l04xrEY.jpg
http://i.imgur.com/wA9IYEA.jpg
http://i.imgur.com/onwPoZS.jpg
http://i.imgur.com/c0tqDQr.jpg
http://i.imgur.com/qNT9M7y.jpg
http://i.imgur.com/6aEYhsS.jpg
http://i.imgur.com/p9A0lRQ.jpg
http://i.imgur.com/xCiEu9E.jpg
http://i.imgur.com/6DSKuTA.jpg
http://i.imgur.com/Btl3sT4.jpg
http://i.imgur.com/J7pMknb.jpg
http://i.imgur.com/XSYncde.jpg
http://i.imgur.com/9yTkSJH.jpg
http://i.imgur.com/Kx43nqS.jpg
http://i.imgur.com/kyALO07.jpg
http://i.imgur.com/dlNF9Td.jpg
http://i.imgur.com/or2MZHd.jpg
http://i.imgur.com/0YUAZrh.jpg
http://i.imgur.com/jOwtFUT.jpg
http://i.imgur.com/xCM8E1y.jpg
http://i.imgur.com/iSuxqnb.jpg
http://i.imgur.com/xo8Hing.jpg
http://i.imgur.com/muMgxW1.jpg
http://i.imgur.com/pnGo4H6.jpg
http://i.imgur.com/tbaSKbz.jpg
http://i.imgur.com/rVwh6AK.jpg
http://i.imgur.com/ESTevXu.jpg
http://i.imgur.com/ImtX3QQ.jpg
http://i.imgur.com/cr5rklT.jpg
http://i.imgur.com/6WBeq1Z.jpg
http://i.imgur.com/V0N6tmq.jpg
http://i.imgur.com/8zsyMGF.jpg
http://i.imgur.com/9EK2PhH.jpg
http://i.imgur.com/xvH2AbK.jpg
http://i.imgur.com/KG8OMO2.jpg
http://i.imgur.com/zIxmanZ.jpg
http://i.imgur.com/JWeACpq.jpg
http://i.imgur.com/JGuuTae.jpg
http://i.imgur.com/uQUEFoU.jpg
http://i.imgur.com/RLluRCf.jpg
http://i.imgur.com/W8UJsDD.jpg
http://i.imgur.com/tmLAitx.jpg
http://i.imgur.com/HnxUIUA.jpg
http://i.imgur.com/euVJx88.jpg
http://i.imgur.com/xJqXweE.jpg
http://i.imgur.com/hGB2c2C.jpg
http://i.imgur.com/G2vdpkY.jpg
http://i.imgur.com/AR8L2HU.jpg
http://i.imgur.com/6N6VZKQ.jpg
http://i.imgur.com/wH9ajei.jpg
http://i.imgur.com/Ejpb1fE.jpg
http://i.imgur.com/lm7TBKn.jpg
http://i.imgur.com/iDzdbIW.jpg
http://i.imgur.com/iNQB4xN.jpg
http://i.imgur.com/oO8o43m.jpg
http://i.imgur.com/r7yscsX.jpg
http://i.imgur.com/XzIJ3XJ.jpg
http://i.imgur.com/DfFa4F3.jpg
http://i.imgur.com/IG4c4Wg.jpg
http://i.imgur.com/HdiQWQL.jpg
http://i.imgur.com/ZMKN0vp.jpg
http://i.imgur.com/77JToQ5.jpg
http://i.imgur.com/6RSy5j3.jpg
http://i.imgur.com/zmWhzE6.jpg
http://i.imgur.com/ZW8GbCn.jpg
http://i.imgur.com/b5nJegk.jpg
http://i.imgur.com/yk289Lv.jpg
http://i.imgur.com/VvXceb1.jpg
http://i.imgur.com/n8dRtLL.jpg
http://i.imgur.com/kgBLuAf.jpg
http://i.imgur.com/HOC98xI.jpg
http://i.imgur.com/XJCERc4.jpg
http://i.imgur.com/yxulJNS.jpg
http://i.imgur.com/gj9GIkY.jpg
http://i.imgur.com/DPPLlCL.jpg
http://i.imgur.com/ivEpVkk.jpg
http://i.imgur.com/6s9rgOQ.jpg
http://i.imgur.com/YoQ4Mxv.jpg
http://i.imgur.com/AEWl495.jpg
http://i.imgur.com/7WZEVVo.jpg
http://i.imgur.com/bqIW37v.jpg
http://i.imgur.com/CxExqVs.jpg
http://i.imgur.com/4YoQlS1.jpg
http://i.imgur.com/JRJa1tW.jpg
http://i.imgur.com/XRhGzrb.jpg
http://i.imgur.com/KtOh4b4.jpg
http://i.imgur.com/HEaX2X4.jpg
http://i.imgur.com/o4mBGcZ.jpg
http://i.imgur.com/QYG8AkC.jpg
http://i.imgur.com/Q9pXpRK.jpg
http://i.imgur.com/QU61EbG.jpg
http://i.imgur.com/nQ8JT2i.jpg
http://i.imgur.com/V2eb5dW.jpg
http://i.imgur.com/It0tR3w.jpg
http://i.imgur.com/eGiaSXs.jpg
http://i.imgur.com/jiZgDU3.jpg
http://i.imgur.com/A4VJFiO.jpg
http://i.imgur.com/ERUYbIs.jpg
http://i.imgur.com/CUqevkS.jpg
http://i.imgur.com/HOsbuww.jpg
http://i.imgur.com/g80nSes.jpg
http://i.imgur.com/EYsflyj.jpg
http://i.imgur.com/QcqUQrU.jpg
http://i.imgur.com/NTD2Xoj.jpg
http://i.imgur.com/KvhmZb1.jpg
http://i.imgur.com/ISJG2lb.jpg
http://i.imgur.com/CGUBF9l.jpg
http://i.imgur.com/7NPbgSz.jpg
http://i.imgur.com/V0b3hhq.jpg
http://i.imgur.com/weXqXLK.jpg
http://i.imgur.com/fJFHey0.jpg
http://i.imgur.com/n1oFHBy.jpg
http://i.imgur.com/ac3xHnv.jpg
http://i.imgur.com/29m4jZZ.jpg
http://i.imgur.com/HOcP3Ed.jpg
http://i.imgur.com/kVEMGwb.jpg
http://i.imgur.com/45p6PlH.jpg
http://i.imgur.com/bygMP7c.jpg
http://i.imgur.com/NTzrHi6.jpg
http://i.imgur.com/D8mxdfo.jpg
http://i.imgur.com/7Q8IES1.jpg
http://i.imgur.com/7DY2VD0.jpg
http://i.imgur.com/e27FrHY.jpg
http://i.imgur.com/W20c8KV.jpg
http://i.imgur.com/s9b5o1X.jpg
http://i.imgur.com/GVc9weW.jpg
http://i.imgur.com/ralH46n.jpg
http://i.imgur.com/kzbjL9i.jpg
http://i.imgur.com/s2aKjLV.jpg
http://i.imgur.com/o1fBKN5.jpg
http://i.imgur.com/XbtcVyk.jpg
http://i.imgur.com/DNnq18u.jpg
http://i.imgur.com/7Gv8fL7.jpg
http://i.imgur.com/A32BuPK.jpg
http://i.imgur.com/5EskRYq.jpg
http://i.imgur.com/tf9ubNf.jpg
http://i.imgur.com/tTKrYV1.jpg
http://i.imgur.com/VvQvqkR.jpg
http://i.imgur.com/4aAbQT0.jpg
http://i.imgur.com/GyBCJsV.jpg
http://i.imgur.com/mminiNW.jpg
http://i.imgur.com/qrjEcwZ.jpg
http://i.imgur.com/pNYiex7.jpg
http://i.imgur.com/uFqSnLh.jpg
http://i.imgur.com/QIOMzOQ.jpg
http://i.imgur.com/SAr78fG.jpg
http://i.imgur.com/R3nlN9T.jpg
http://i.imgur.com/IxUB6zB.jpg
http://i.imgur.com/UaDSUjF.jpg
http://i.imgur.com/5Z4Qzmy.jpg
http://i.imgur.com/tAsv8D2.jpg
http://i.imgur.com/JosVpxN.jpg
http://i.imgur.com/I0DaO2d.jpg
http://i.imgur.com/aDy1QoT.jpg
http://i.imgur.com/9heekyG.jpg
http://i.imgur.com/k3EozGA.jpg
http://i.imgur.com/DL9a3ug.jpg
http://i.imgur.com/nCLx6zF.jpg
http://i.imgur.com/9e8mwCe.jpg
http://i.imgur.com/hFLeEBe.jpg
http://i.imgur.com/zzpghB7.jpg
http://i.imgur.com/Xv5bUqP.jpg
http://i.imgur.com/qlYSaMI.jpg
http://i.imgur.com/2GdHTva.jpg
http://i.imgur.com/BW2HEFP.jpg
http://i.imgur.com/cxOxWQe.jpg
http://i.imgur.com/1qgjxaF.jpg
http://i.imgur.com/bHbQCn9.jpg
http://i.imgur.com/oYVKpD6.jpg
http://i.imgur.com/uZ88q3I.jpg
http://i.imgur.com/ug2v56M.jpg
http://i.imgur.com/07QaejI.jpg
http://i.imgur.com/bunT1YO.jpg
http://i.imgur.com/g5CYdKL.jpg
http://i.imgur.com/qIILQQd.jpg
http://i.imgur.com/HM1SKAY.jpg
http://i.imgur.com/PIRbbkX.jpg
http://i.imgur.com/O7qZftX.jpg
http://i.imgur.com/M6unzYH.jpg
http://i.imgur.com/dBAZylO.jpg
http://i.imgur.com/6R6pIyV.jpg
http://i.imgur.com/QHcALRX.jpg
http://i.imgur.com/UgYZIOI.jpg
http://i.imgur.com/nT2kA6N.jpg
http://i.imgur.com/5SDWz1L.jpg
http://i.imgur.com/GS09fTY.jpg
http://i.imgur.com/Yb7h0OP.jpg
http://i.imgur.com/lABFNQ0.jpg
http://i.imgur.com/5idSZRp.jpg
http://i.imgur.com/Y4gcGIS.jpg
http://i.imgur.com/fAraT0F.jpg
http://i.imgur.com/Y7JmUlk.jpg
http://i.imgur.com/9dM7R65.jpg
http://i.imgur.com/8BDA53q.jpg
http://i.imgur.com/DBPadOR.jpg
http://i.imgur.com/lSjNCvY.jpg
http://i.imgur.com/5svLJJ5.jpg
http://i.imgur.com/BhV4Csj.jpg
http://i.imgur.com/hcxCSS4.jpg
http://i.imgur.com/uq3Fad7.jpg
http://i.imgur.com/8ntzWoj.jpg
http://i.imgur.com/JwAHfdn.jpg
http://i.imgur.com/zOxVWEX.jpg
http://i.imgur.com/CplPnXo.jpg
http://i.imgur.com/9R7Ahtc.jpg
http://i.imgur.com/1jSlIWz.jpg
http://i.imgur.com/xNtm2KU.jpg
http://i.imgur.com/zv3zb7K.jpg
http://i.imgur.com/WHgpKcr.jpg
http://i.imgur.com/fEjkaWq.jpg
http://i.imgur.com/PrKiqc0.jpg
http://i.imgur.com/f0XbO9D.jpg
http://i.imgur.com/xC4RFMp.jpg
http://i.imgur.com/FUC7Ztm.jpg
http://i.imgur.com/MQodhkC.jpg
http://i.imgur.com/Fq68uLP.jpg
http://i.imgur.com/j0oqkH6.jpg
http://i.imgur.com/aKdAkli.jpg
http://i.imgur.com/vXrw9aJ.jpg
http://i.imgur.com/sVc5dtQ.jpg
http://i.imgur.com/Rmxh6qX.jpg
http://i.imgur.com/MCL2aGr.jpg
http://i.imgur.com/8jjGxUp.jpg
http://i.imgur.com/uQPi7zu.jpg
http://i.imgur.com/6MBPJk8.jpg
http://i.imgur.com/tiY9gH6.jpg
http://i.imgur.com/eZdHYBr.jpg
http://i.imgur.com/ZdAy87e.jpg
http://i.imgur.com/yf6Alj9.jpg
http://i.imgur.com/c1izb5D.jpg
http://i.imgur.com/3tQyOrV.jpg
http://i.imgur.com/rOi4f2q.jpg
http://i.imgur.com/eXNthWk.jpg
http://i.imgur.com/mzZBfgp.jpg
http://i.imgur.com/nWwb8lI.jpg
http://i.imgur.com/OOVGlmh.jpg
http://i.imgur.com/8WHLmSH.jpg
http://i.imgur.com/5TZ25bB.jpg
http://i.imgur.com/JIGLh7m.jpg
http://i.imgur.com/p8oc7Ep.jpg
http://i.imgur.com/LCRur59.jpg
http://i.imgur.com/Wq3bYJT.jpg
http://i.imgur.com/MgXMVu0.jpg
http://i.imgur.com/hjOz9I2.jpg
http://i.imgur.com/NDRoOAV.jpg
http://i.imgur.com/fmnwUHT.jpg
http://i.imgur.com/93tkvIs.jpg
http://i.imgur.com/gdqfsjJ.jpg
http://i.imgur.com/ckJ5jBJ.jpg
http://i.imgur.com/VTlRfqN.jpg
http://i.imgur.com/WFLYs1u.jpg
http://i.imgur.com/PuPlfEf.jpg
http://i.imgur.com/WD1kYiV.jpg
http://i.imgur.com/hR6SDu0.jpg
http://i.imgur.com/L7cT8rL.jpg
http://i.imgur.com/hNVtNlp.jpg
http://i.imgur.com/M0ULOQ6.jpg
http://i.imgur.com/AVOMlJU.jpg
http://i.imgur.com/N5luQHQ.jpg
http://i.imgur.com/6wzYQlm.jpg
http://i.imgur.com/c9EJgoE.jpg
http://i.imgur.com/bcPfo7O.jpg
http://i.imgur.com/236HRzS.jpg
http://i.imgur.com/0K1Lv9f.jpg
http://i.imgur.com/ClCmDvZ.jpg
http://i.imgur.com/3rVmU3f.jpg`

names = names.split(/\n/); //separates the list of things into an array of things
links = links.split(/\n/);

//the links and names above are coppied from the table located at https://airtable.com/shrF8Vr0O5VPB6ZoR/tblp9rsxx6AsHwOzW/viw42CNIgWnLe5NSl
//



module.exports = {

    inkSearch: async (query) => {
        var inks = {}; //empty object
        for(let i = 0;i<names.length;i++) {
            inks[names[i]] = links[i]; //Grabs the first item in 'names', and makes that the key to the first link, then second, etc. Brackets are used for dynamic notation.
        }
        var results = fuzzy.filter(query, Object.keys(inks)); //Searches the array of keys with the query and sets it to a variable
        if(!results[0]) return "Couldn't find an ink by that name, try using less words or removing puncuation."; //If the variable is empty...
        var final = results[0].original; //Final is the name of the key in the 'inks' object.
        return [final, inks[final]]; //Which makes inks[final] equal to the link to the ink.
    }
    
}

