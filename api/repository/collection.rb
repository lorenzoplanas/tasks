# encoding: utf-8
require 'redis'

module Tasker
  module Repository
    class Collection
      def initialize
        self.db = Redis.new
      end

      def persist(id, elements=[])
        elements ||= []
        return self if elements.empty?
        db.sadd(id, *elements)
        self
      end 

      def fetch(id)
        db.smembers(id)
      end

      def delete(id)
        db.del(id)
        self
      end

      private

      attr_accessor :db
    end # Member
  end # Repository 
end # Tasker

