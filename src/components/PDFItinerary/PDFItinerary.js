import React from 'react';
import { Document, Page, Text, View, Font, StyleSheet, Image } from '@react-pdf/renderer';

const removeMd = require('remove-markdown');

const PDFItinerary = (props) => {
  const { lists, title, accentColor, headerImages, backgroundColor } = props; 

  Font.register({ family: 'Nunito Sans', fonts: [
    { src: 'https://fonts.gstatic.com/s/nunitosans/v1/qDS9UelBO44ppiSawKNcIKCWcynf_cDxXwCLxiixG1c.ttf' }, // font-style: normal, font-weight: normal
    { src: 'https://fonts.gstatic.com/s/nunitosans/v1/XvilrNtBQKRMeiqSPzEFHXe1Pd76Vl7zRpE7NLJQ7XU.ttf', fontWeight: 700 },
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
      marginHorizontal: 0,
      width: 620
    },
    titleParent: {
  	  // display: 'flex',
  	  // flexDirection: 'column',
  	  // height: 300,
      // justifyContent: 'center'
      marginTop: 20,
      marginBottom: 20
    },
    title: {
      color: '#616161',
      fontFamily: 'Nunito Sans',
      fontWeight: 700,
      fontSize: 24,
      textAlign: 'center'
    },
	  listTitle: {
      color: '#424242',
      fontFamily: 'Nunito Sans',
      fontWeight: 700,
      fontSize: 18,
      marginBottom: 10,
      marginTop: 10,
      paddingHorizontal: 50
    },
    card: {
      fontFamily: 'Nunito Sans',
      fontSize: 12,
      lineHeight: 1.3,
      marginBottom: 5,
      paddingTop: 15,
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
    marginHorizontal: {
      marginHorizontal: 20
    },
    cardTitle: {
      color: accentColor,
	    fontSize: 16,
    },
    cardTime: {
      color: '#333333',
      fontWeight: 700,
      fontSize: 12,
      marginBottom: 8
    },
    cardAddress: {
      color: '#757575',
    },
	  cardLink: {
      color: '#757575',
      marginBottom: 3
    },
    cardDesc: {
      color: '#757575',
      marginTop: 10
    },
    cardLabelParent: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 5,
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
      color: '#0055B3',
      backgroundColor: '#e6f7ff',
      border: '1 solid #91d5ff'
    },
    cardLabelteal: {
      color: '#0055B3',
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
    cardLabelred: {
      color: '#f5222d',
      backgroundColor: '#fff1f0',
      border: '1 solid #ffa39e'
    },
    pageNumber: {
      color: 'grey',
      fontSize: 12,
      position: 'absolute',
      minHeight: '40px',
      bottom: '0px',
      left: '0px',
      right: '0px',
      textAlign: 'center',
    }
  });


  function formatedTime(str) {
    const time = new Date(str)
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const encodeURI = (uri) => {
    return encodeURIComponent(uri);
  }

  const headerImgUrl = encodeURI(headerImages[5].url);
  return (
      <Document>
          <Page size="LETTER">

            <View style={styles.titleParent}>
              <Text style={styles.title}>{title}</Text>
            </View>

            { /* <Text style={styles.banner}></Text> */ }

              {headerImages ? 
                <Image 
                  style={styles.image}
                  src={`/api/img/${headerImgUrl}`}>
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
                        src={`/api/img/${encodeURI(card.cover.url)}`}>
                      </Image>
                    }
                    
                    <Text style={[styles.cardTitle]}>{card.name}</Text>

                    {card.customFieldItems.map((field, k) => (
                      <View key={k}>
                        {field.name === 'Address' && <Text style={styles.cardAddress}>{field.value.text}</Text>}
                        {field.name === 'Link' && <Text style={styles.cardLink}>{field.value.text}</Text>}
                      </View>
                    ))}

                    <Text style={[styles.cardDesc]}>{removeMd(card.desc)}</Text>
                    
                    <View style={[styles.cardLabelParent]}>
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