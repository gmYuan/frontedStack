/**
 * trie:  以node为节点的N叉树 + node的next不是直接指向下一个节点，而是利用Map 关联起 char-node
 * 
 *  S1 add: 创建root + 循环更新curNode + 标记单词
 *  S2 contains: 循环更新curNode + 每次都判断是否包含char
 *  S3 isPrefix: 基本同contains，区别是 最后返回无需判断 是否为已有单词
 * 
 *  S4 关于递归实现方法，见:
 *    https://github.com/liuyubobobo/Play-with-Data-Structures/blob/master/10-Trie/Optional-01-Trie-in-Recursion/src/TrieR.java
 */


class node {
	isWord: boolean
	next: Map<string, node>
	constructor(isWord = false) {
		this.isWord = isWord
		this.next = new Map()
	}
}

class trie {
	root: node
	size: number
	constructor() {
		this.root = new node()
		this.size = 0
	}

	getSIze() {
		return this.size
	}

	//S1 创建root + 循环更新curNode + 标记单词 
	add(word: string) {
		let cur = this.root
		for (let char of word) {
			if (cur.next.get(char) == null) {
				cur.next.set(char, new node())
			}
			// 循环更新cur
			cur = cur.next.get(char)
		}

		if (!cur.isWord) {
			cur.isWord = true
			this.size++
		}
	}

	//S2 contains: 循环更新curNode + 每次都判断是否包含char
	contains(word: string) {
		let cur = this.root
		for (let char of word) {
			if (cur.next.get(char) == null) {
				return false
			}
			cur = cur.next.get(char)
		}
		return cur.isWord
	}

	//S3 isPrefix: 基本同contains，区别是 最后返回无需判断 是否为已有单词
	isPrefix(word: string) {
		let cur = this.root
		for (let char of word) {
			if (cur.next.get(char) == null) {
				return false
			}
			cur = cur.next.get(char)
		}
		return true
	}

}