import { motion } from 'framer-motion'
import { useState } from 'react'
import { Wallet, Check, ArrowRight, Copy } from 'lucide-react'

export default function Recharge() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  const rechargePackages = [
    { id: '50k', amount: 50000, label: '50,000đ', bonus: 0 },
    { id: '100k', amount: 100000, label: '100,000đ', bonus: 5000 },
    { id: '200k', amount: 200000, label: '200,000đ', bonus: 15000 },
    { id: '500k', amount: 500000, label: '500,000đ', bonus: 50000 },
    { id: '1m', amount: 1000000, label: '1,000,000đ', bonus: 150000 },
    { id: '2m', amount: 2000000, label: '2,000,000đ', bonus: 300000 },
  ]

  const paymentMethods = [
    { id: 'card', name: 'Thẻ tín dụng/Ghi nợ', icon: '💳' },
    { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: '🏦' },
    { id: 'momo', name: 'Ví MoMo', icon: '📱' },
    { id: 'zalopay', name: 'ZaloPay', icon: '💰' },
  ]

  const [selectedPayment, setSelectedPayment] = useState('card')
  const [copied, setCopied] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })

  // QR info for different payment methods
  const qrPaymentMethods = {
    bank: {
      title: 'Chuyển khoản ngân hàng',
      bankName: 'TP Bank',
      accountNumber: '1234567890',
      accountHolder: 'QATTH COMPANY',
      qrCode: 'public/qr.jpg'
    },
    momo: {
      title: 'Ví MoMo',
      phoneNumber: '0912345678',
      accountHolder: 'QATTH COMPANY',
      appName: 'MoMo',
      qrCode: 'public/momo.jpg'
    },
    zalopay: {
      title: 'ZaloPay',
      phoneNumber: '0912345678',
      accountHolder: 'QATTH COMPANY',
      appName: 'ZaloPay',
      qrCode: 'public/zalopay.jpg'
    }
  }

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(qrPaymentMethods.bank.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRecharge = () => {
    if (!selectedPackage && !customAmount) {
      alert('Vui lòng chọn gói hoặc nhập số tiền')
      return
    }

    // Validate card info if card payment
    if (selectedPayment === 'card') {
      if (!cardInfo.cardNumber || !cardInfo.cardHolder || !cardInfo.expiryDate || !cardInfo.cvv) {
        alert('Vui lòng điền đầy đủ thông tin thẻ')
        return
      }
    }

    // Show QR modal for bank/momo/zalopay
    if (['bank', 'momo', 'zalopay'].includes(selectedPayment)) {
      setShowQRModal(true)
    } else if (selectedPayment === 'card') {
      alert('Đang xử lý thanh toán bằng thẻ...')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-brand-100 rounded-full">
            <Wallet className="w-5 h-5 text-brand-600" />
            <span className="text-sm font-semibold text-brand-600">Nạp tiền</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Nạp tiền vào tài khoản</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Chọn gói nạp tiền phù hợp và thanh toán để sử dụng các tính năng cao cấp
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left - Packages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 space-y-4"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Chọn gói nạp tiền</h2>

            {/* Card Payment Form - Top */}
            {selectedPayment === 'card' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-brand-50 rounded-lg border border-brand-200 space-y-3"
              >
                <h3 className="font-bold text-slate-900">Thông tin thẻ</h3>
                <input
                  type="text"
                  placeholder="Số thẻ (16 chữ số)"
                  maxLength={16}
                  value={cardInfo.cardNumber}
                  onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:border-brand-600"
                />
                <input
                  type="text"
                  placeholder="Tên chủ thẻ"
                  value={cardInfo.cardHolder}
                  onChange={(e) => setCardInfo({ ...cardInfo, cardHolder: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:border-brand-600"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardInfo.expiryDate}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '')
                      if (val.length >= 2) {
                        val = val.slice(0, 2) + '/' + val.slice(2, 4)
                      }
                      setCardInfo({ ...cardInfo, expiryDate: val })
                    }}
                    className="px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:border-brand-600"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength={3}
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, '') })}
                    className="px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:border-brand-600"
                  />
                </div>
              </motion.div>
            )}

            {/* Preset Packages */}
            <div className="grid grid-cols-2 gap-3">
              {rechargePackages.map((pkg, idx) => (
                <motion.button
                  key={pkg.id}
                  onClick={() => {
                    setSelectedPackage(pkg.id)
                    setCustomAmount('')
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-brand-600 bg-brand-50 shadow-lg'
                      : 'border-brand-200 bg-white hover:border-brand-300'
                  }`}
                >
                  <div className="text-lg font-bold text-slate-900">{pkg.label}</div>
                  {pkg.bonus > 0 && (
                    <div className="text-sm text-green-600 font-semibold mt-1">
                      +{(pkg.bonus / 1000).toFixed(0)}k bonus
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-6 p-4 border-2 border-brand-200 rounded-lg">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Hoặc nhập số tiền tùy chỉnh
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedPackage(null)
                  }}
                  placeholder="Nhập số tiền (VNĐ)"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-600"
                />
                <span className="flex items-center text-slate-600 font-medium">đ</span>
              </div>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-lg border border-brand-200"
            >
              <div className="space-y-2">
                <div className="flex justify-between text-slate-700">
                  <span>Số tiền:</span>
                  <span className="font-semibold">
                    {selectedPackage
                      ? rechargePackages.find((p) => p.id === selectedPackage)?.label
                      : customAmount
                      ? `${parseInt(customAmount).toLocaleString()}đ`
                      : '0đ'}
                  </span>
                </div>
                {selectedPackage && (rechargePackages.find((p) => p.id === selectedPackage)?.bonus ?? 0) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Bonus:</span>
                    <span className="font-semibold">
                      +{(rechargePackages.find((p) => p.id === selectedPackage)?.bonus ?? 0).toLocaleString()}đ
                    </span>
                  </div>
                )}
                <div className="border-t border-brand-200 pt-2 flex justify-between text-lg font-bold text-brand-600">
                  <span>Tổng cộng:</span>
                  <span>
                    {selectedPackage
                      ? (
                          rechargePackages.find((p) => p.id === selectedPackage)!.amount +
                          rechargePackages.find((p) => p.id === selectedPackage)!.bonus
                        ).toLocaleString()
                      : customAmount
                      ? parseInt(customAmount).toLocaleString()
                      : '0'}
                    đ
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Payment Method */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg border border-brand-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Phương thức thanh toán</h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      selectedPayment === method.id
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-brand-200 bg-white hover:border-brand-300'
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <span className="flex-1 text-left text-sm font-medium text-slate-900">
                      {method.name}
                    </span>
                    {selectedPayment === method.id && (
                      <Check className="w-5 h-5 text-brand-600" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleRecharge}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Tiến hành thanh toán
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Security Info */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-700">
                  ✓ Thanh toán an toàn với mã hóa SSL 256-bit
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg border border-brand-200 p-4 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3">Câu hỏi thường gặp</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">Tiền được cộng khi nào?</p>
                  <p className="text-slate-600">Trong vòng 1-5 phút sau khi thanh toán thành công</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Có hoàn tiền không?</p>
                  <p className="text-slate-600">Có thể hoàn tiền trong 7 ngày nếu chưa sử dụng</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowQRModal(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            {selectedPayment === 'bank' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 text-center">
                  {qrPaymentMethods.bank.title}
                </h2>
                <div className="flex justify-center">
                  <img 
                    src={qrPaymentMethods.bank.qrCode} 
                    alt="Bank QR Code" 
                    className="w-48 h-48 border-4 border-brand-200 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Số tài khoản</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-900">{qrPaymentMethods.bank.accountNumber}</p>
                      <button
                        onClick={handleCopyAccount}
                        className="p-2 hover:bg-brand-100 rounded transition-colors"
                      >
                        <Copy size={16} className={copied ? 'text-green-600' : 'text-brand-600'} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Chủ tài khoản</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.bank.accountHolder}</p>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Ngân hàng</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.bank.bankName}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedPayment === 'momo' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 text-center">
                  {qrPaymentMethods.momo.title}
                </h2>
                <div className="flex justify-center">
                  <img 
                    src={qrPaymentMethods.momo.qrCode} 
                    alt="MoMo QR Code" 
                    className="w-48 h-48 border-4 border-brand-200 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Số điện thoại</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.momo.phoneNumber}</p>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Chủ tài khoản</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.momo.accountHolder}</p>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Ứng dụng</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.momo.appName}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedPayment === 'zalopay' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 text-center">
                  {qrPaymentMethods.zalopay.title}
                </h2>
                <div className="flex justify-center">
                  <img 
                    src={qrPaymentMethods.zalopay.qrCode} 
                    alt="ZaloPay QR Code" 
                    className="w-48 h-48 border-4 border-brand-200 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Số điện thoại</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.zalopay.phoneNumber}</p>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Chủ tài khoản</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.zalopay.accountHolder}</p>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-xs text-slate-600 mb-1">Ứng dụng</p>
                    <p className="font-bold text-slate-900">{qrPaymentMethods.zalopay.appName}</p>
                  </div>
                </div>
              </div>
            )}

            <motion.button
              onClick={() => setShowQRModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors"
            >
              Đóng
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
