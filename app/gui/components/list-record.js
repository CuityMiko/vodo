import ScrollToMe from './scroll-to-me'
import classnames from 'classnames'

@autobind
class ListRecord extends Component {

  @CSS({
    '.list': {
      fontSize: 11,
      lineHeight: 25
    },
    '.fa': {
      width: 16,
      textAlign: 'center'
    },
    '.leaf': {
      paddingLeft: 5,
      '&.select': {
        background: '#DDD'
      }
    },
    '.method': {
      display: 'inline-block',
      verticalAlign: 'middle',
      color: '#AAA',
      transform: 'scale(0.6)',
      width: 40,
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    '.hot .hotbg': {
      '@keyframes hot': {
        '0%': {
          background: 'rgba(0, 0, 0, 0)'
        },
        '20%': {
          background: 'rgba(0, 0, 0, 0.2)'
        },
        '100%': {
          background: 'rgba(0, 0, 0, 0)'
        }
      },
      animation: 'hot 1s ease-out'
    }
  })
  render () {
    const { data, onSelect, selected } = this.props
    return (
      <div className="list">
        {data.map(record => (
          <div
            key={record.requestID}
            className={classnames('leaf', {
              select: selected === record.requestID,
              hot: Date.now() - record.startTime < 1000
            })}
            onClick={() => onSelect(record)}
          >
            <div className="hotbg">
              <i className={classnames('fa', {
                'fa-upload': record.status === 'requesting',
                'fa-download': record.status === 'receiving',
                'fa-check': record.status === 'finish',
                'fa-close': record.status === 'error',
              })} />
              <span className="method">
                {record.method.toUpperCase()}
              </span>
              {selected === record.requestID ? (
                <ScrollToMe />
              ): null}
              {record.protocol === 'file:' ? (
                <span>
                  本地文件 - {record.pathname}
                </span>
              ) : (
                <span>
                  {record.protocol}//{record.hostname}:{record.port}{record.pathname}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default ListRecord

