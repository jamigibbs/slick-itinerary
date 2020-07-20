import React from 'react';
import { Document, Page, Text, View, Font, StyleSheet, Image } from '@react-pdf/renderer';

const removeMd = require('remove-markdown');

const PDFItinerary = (props) => {
  const { lists, title, accentColor, headerImages, backgroundColor } = props; 

  // https://gist.github.com/karimnaaji/b6c9c9e819204113e9cabf290d580551
  Font.register({ family: 'PT Serif', fonts: [
    { src: 'http://fonts.gstatic.com/s/ptserif/v8/sAo427rn3-QL9sWCbMZXhA.ttf' }, // font-style: normal, font-weight: normal
    { src: 'http://fonts.gstatic.com/s/ptserif/v8/kyZw18tqQ5if-_wpmxxOeKCWcynf_cDxXwCLxiixG1c.ttf', fontWeight: 700 },
   ]});

   Font.register({ family: 'Roboto', fonts: [
    { src: 'http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf' }, // font-style: normal, font-weight: normal
    { src: '"http://fonts.gstatic.com/s/roboto/v15/7MygqTe2zs9YkP0adA9QQQ.ttf', fontWeight: 100 },
    { src: 'http://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf', fontWeight: 300 },
    { src: 'http://fonts.gstatic.com/s/roboto/v15/Uxzkqj-MIMWle-XP2pDNAA.ttf', fontWeight: 500 },
    { src: 'http://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf', fontWeight: 700 },
   ]});

   const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
    },
    banner: {
      backgroundColor: accentColor,
      padding: '15px'
    },
    image: {
      height: 450,
      marginHorizontal: 0,
      width: 620,
    },
    titleParent: {
  	  display: 'flex',
  	  flexDirection: 'column',
  	  height: 300,
  	  justifyContent: 'center'
    },
    title: {
      color: '#333333',
      fontFamily: 'Roboto',
      fontWeight: 100,
      fontSize: 30,
      textAlign: 'center'
    },
	  listTitle: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 20
    },
    card: {
      border: '1 dashed #efefef',
      fontSize: 12,
      lineHeight: 1.4,
      marginBottom: 20,
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 50
    },
    cardImage: {
      width: 50,
      borderRadius: 5,
      marginRight: 40,
      marginTop: 10,
      position: 'absolute',
      right: 0
    },
    cardTitle: {
      color: accentColor,
	    fontSize: 16,
      marginHorizontal: 30
    },
    cardTime: {
      color: '#999999',
      fontSize: 12,
      marginBottom: 8
    },
    cardAddress: {
      color: '#757575',
      marginHorizontal: 30
    },
	  cardLink: {
      color: '#757575',
      marginHorizontal: 30
    },
    cardDesc: {
      color: '#212121',
      marginHorizontal: 30,
      marginBottom: 5,
      marginTop: 10
    },
    cardLabelParent: {
      // borderTop: '1 solid #efefef',
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 10,
      marginHorizontal: 30,
      width: 500
    },
    cardLabel: {
      fontSize: 9,
	    marginRight: 5,
      paddingTop: 5,
      paddingHorizontal: 10,
      textTransform: 'uppercase'
    },
    cardLabelorange: {
      color: '#fa8c16',
      backgroundColor: '#fff7e6',
      border: '1 solid #ffd591'
    },
    cardLabelpink: {
      color: '#eb2f96',
      backgroundColor: '#fff0f6',
      border: '1 solid #ffadd2'
    },
    cardLabelblue: {
      color: '#1890ff',
      backgroundColor: '#e6f7ff',
      border: '1 solid #91d5ff'
    },
    cardLabelteal: {
      color: '#1890ff',
      backgroundColor: '#e6f7ff',
      border: '1 solid #91d5ff'
    },
    cardLabelgreen: {
      color: '#52c41a',
      backgroundColor: '#f6ffed',
      border: '1 solid #b7eb8f'
    },
    cardLabelyellow: {
      color: '#fadb14',
      backgroundColor: '#feffe6',
      border: '1 solid #fffb8f'
    },
    cardLabelpurple: {
      color: '#722ed1',
      backgroundColor: '#f9f0ff',
      border: '1 solid #d3adf7'
    },
    cardLabellime: {
      color: '#a0d911',
      backgroundColor: '#fcffe6',
      border: '1 solid #eaff8f'
    },
    cardLabelblack: {
      color: '#ffffff',
      backgroundColor: 'black'
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    }
  });


  function formatedTime(str) {
    const time = new Date(str)
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  return (
      <Document>
          <Page size="LETTER">
            <Text style={styles.banner}></Text>

            <View style={styles.titleParent}>
              <Text style={styles.title}>{title}</Text>
            </View>

              {headerImages ? 
                <Image 
                  style={styles.image}
                  src={`https://slick-itinerary-img.herokuapp.com/${headerImages[5].url}`}>
                </Image>
              : <Text style={[styles.image, { backgroundColor: backgroundColor}]}></Text>}

              <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
              )} fixed />

          </Page>

            {lists.map((list, i) => (
              <Page size="LETTER" style={styles.body}>
              
                <Text style={styles.listTitle}>{list.name}</Text>

                {list.cards.map((card, j) => (
                  <View key={j} style={styles.card}>
                    {card.customFieldItems.map((field, t) => (
                      <View key={t}>
                        {field.name === 'Start Time' && 
                          <Text style={styles.cardTime}>{formatedTime(field.value.date)}</Text>
                        }
                      </View>
                    ))}

                    {card.cover && 
                      <Image 
                        style={styles.cardImage}
                        src={`https://slick-itinerary-img.herokuapp.com/${card.cover.url}`}>
                      </Image>
                    }
                    
                    <Text style={styles.cardTitle}>{card.name}</Text>

                    {card.customFieldItems.map((field, k) => (
                      <View key={k}>
                        {field.name === 'Address' && <Text style={styles.cardAddress}>{field.value.text}</Text>}
                        {field.name === 'Link' && <Text style={styles.cardLink}>{field.value.text}</Text>}
                      </View>
                    ))}

                    <Text style={styles.cardDesc}>{removeMd(card.desc)}</Text>
                    
                    <View style={styles.cardLabelParent}>
                    {card.labels.map((label) => (
                      <Text style={[styles.cardLabel, styles[`cardLabel${label.color}`]]}>{label.name}</Text>
                    ))}
                    </View>

                  </View>
                ))}

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                  `${pageNumber} / ${totalPages}`
                )} fixed />

              </Page>
            ))}
      </Document>
  )
}

export default PDFItinerary;