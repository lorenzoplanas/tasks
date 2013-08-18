# encoding: utf-8
require 'set'
require_relative '../repository/collection'

module Tasker
  module List
    class Collection
      def initialize(member_ids=Set.new)
        self.member_ids = member_ids || Set.new
        self.repository = Repository::Collection.new
      end

      def fetch
        self.member_ids = repository.fetch(key)
        self
      end

      def persist
        repository.persist(key, member_ids)
        self
      end

      def delete
        repository.delete(key)
      end 

      def add(member)
        self.member_ids = member_ids.add(member.id)
      end

      def remove(member)
        self.member_ids = member_ids.delete(member.id)
      end

      def to_json
        member_ids.map { |member_id| Member.new(id: member_id).fetch }.to_json
      end

      private

      attr_accessor :member_ids, :repository

      def key
        'lists'
      end 
    end # Collection
  end # List
end # Tasker

